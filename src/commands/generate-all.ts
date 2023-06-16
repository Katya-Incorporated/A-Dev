import { Command, flags } from '@oclif/command'

import { createVendorDirs } from '../blobs/build'
import { copyBlobs } from '../blobs/copy'
import { BlobEntry } from '../blobs/entry'
import { DeviceConfig, loadDeviceConfigs } from '../config/device'
import { forEachDevice } from '../frontend/devices'
import {
  enumerateFiles,
  extractFirmware,
  extractOverlays,
  extractProps,
  extractVintfManifests,
  flattenApexs,
  generateBuildFiles,
  loadCustomState,
  PropResults,
  resolveOverrides,
  resolveSepolicyDirs,
  updatePresigned,
} from '../frontend/generate'
import { WRAPPED_SOURCE_FLAGS, wrapSystemSrc } from '../frontend/source'
import { SelinuxPartResolutions } from '../selinux/contexts'
import { withSpinner } from '../util/cli'
import { withTempDir } from '../util/fs'
import { writeReadme } from '../frontend/readme'
import { enforceApkMaxVersionRequirements } from '../blobs/apk'
import { enforceBlobHashRequirements } from '../blobs/check-hash'

const doDevice = (
  config: DeviceConfig,
  stockSrc: string,
  customSrc: string,
  aapt2Path: string,
  buildId: string | undefined,
  factoryPath: string | undefined,
  skipCopy: boolean,
  useTemp: boolean,
) =>
  withTempDir(async tmp => {
    // Prepare stock system source
    let wrapBuildId = buildId == undefined ? null : buildId
    let wrapped = await withSpinner('Extracting stock system source', spinner =>
      wrapSystemSrc(stockSrc, config.device.name, wrapBuildId, useTemp, tmp, spinner),
    )
    stockSrc = wrapped.src!
    if (wrapped.factoryPath != null && factoryPath == undefined) {
      factoryPath = wrapped.factoryPath
    }

    // customSrc can point to a (directory containing) system state JSON or out/
    let customState = await loadCustomState(config, aapt2Path, customSrc)

    // Each step will modify this. Key = combined part path
    let namedEntries = new Map<string, BlobEntry>()

    // Prepare output directories
    let dirs = await createVendorDirs(config.device.vendor, config.device.name)

    // 1. Diff files
    await withSpinner('Enumerating files', spinner =>
      enumerateFiles(spinner, config.filters.files, config.filters.dep_files, namedEntries, customState, stockSrc),
    )

    // 2. Overrides
    let buildPkgs: string[] = []
    if (config.generate.overrides) {
      let builtModules = await withSpinner('Replacing blobs with buildable modules', () =>
        resolveOverrides(config, customState, dirs, namedEntries),
      )
      buildPkgs.push(...builtModules)
    }
    // After this point, we only need entry objects
    let entries = Array.from(namedEntries.values())

    if (config.blob_hash_requirements.size > 0) {
      await withSpinner('Checking blob hash requirements', spinner =>
        enforceBlobHashRequirements(spinner, stockSrc, entries, config.blob_hash_requirements)
      )
    }

    if (config.apk_max_version_requirements.size > 0) {
      await withSpinner('Checking APK max version requirements', spinner =>
        enforceApkMaxVersionRequirements(spinner, stockSrc, entries, config.apk_max_version_requirements)
      )
    }

    // 3. Presigned
    if (config.generate.presigned) {
      await withSpinner('Marking apps as presigned', spinner =>
        updatePresigned(spinner, config, entries, aapt2Path, stockSrc),
      )
    }

    // 4. Flatten APEX modules
    if (config.generate.flat_apex) {
      entries = await withSpinner('Flattening APEX modules', spinner =>
        flattenApexs(spinner, entries, dirs, tmp, stockSrc),
      )
    }

    // 5. Extract
    // Copy blobs (this has its own spinner)
    if (config.generate.files && !skipCopy) {
      await copyBlobs(entries, stockSrc, dirs.proprietary)
    }

    // 6. Props
    let propResults: PropResults | null = null
    if (config.generate.props) {
      propResults = await withSpinner('Extracting properties', () => extractProps(config, customState, stockSrc))
    }

    // 7. SELinux policies
    let sepolicyResolutions: SelinuxPartResolutions | null = null
    if (config.generate.sepolicy_dirs) {
      sepolicyResolutions = await withSpinner('Adding missing SELinux policies', () =>
        resolveSepolicyDirs(config, customState, dirs, stockSrc),
      )
    }

    // 8. Overlays
    if (config.generate.overlays) {
      let overlayPkgs = await withSpinner('Extracting overlays', spinner =>
        extractOverlays(spinner, config, customState, dirs, aapt2Path, stockSrc),
      )
      buildPkgs.push(...overlayPkgs)
    }

    // 9. vintf manifests
    let vintfManifestPaths: Map<string, string> | null = null
    if (config.generate.vintf) {
      vintfManifestPaths = await withSpinner('Extracting vintf manifests', () =>
        extractVintfManifests(customState, dirs, stockSrc),
      )
    }

    // 10. Firmware
    let fwPaths: Array<string> | null = null
    if (config.generate.factory_firmware && factoryPath != undefined) {
      if (propResults == null) {
        throw new Error('Factory firmware extraction depends on properties')
      }

      fwPaths = await withSpinner('Extracting firmware', () =>
        extractFirmware(config, dirs, propResults!.stockProps, factoryPath!),
      )
    }

    // 11. Build files
    await withSpinner('Generating build files', () =>
      generateBuildFiles(
        config,
        dirs,
        entries,
        buildPkgs,
        propResults,
        fwPaths,
        vintfManifestPaths,
        sepolicyResolutions,
        stockSrc,
      ),
    )

    // 12. Readme
    await writeReadme(config, dirs, propResults)
  })

export default class GenerateFull extends Command {
  static description = 'generate all vendor parts automatically'

  static flags = {
    help: flags.help({ char: 'h' }),
    aapt2: flags.string({
      char: 'a',
      description: 'path to aapt2 executable',
      default: 'out/host/linux-x86/bin/aapt2',
    }),
    customSrc: flags.string({
      char: 'c',
      description: 'path to AOSP build output directory (out/) or (directory containing) JSON state file',
      default: 'out',
    }),
    factoryPath: flags.string({
      char: 'f',
      description: 'path to stock factory images zip (for extracting firmware if stockSrc is not factory images)',
    }),
    skipCopy: flags.boolean({
      char: 'k',
      description: 'skip file copying and only generate build files',
      default: false,
    }),
    parallel: flags.boolean({
      char: 'p',
      description: 'generate devices in parallel (causes buggy progress spinners)',
      default: false,
    }),

    ...WRAPPED_SOURCE_FLAGS,
  }

  static args = [{ name: 'config', description: 'path to device-specific YAML config', required: true }]

  async run() {
    let {
      flags: { aapt2: aapt2Path, buildId, stockSrc, customSrc, factoryPath, skipCopy, useTemp, parallel },
      args: { config: configPath },
    } = this.parse(GenerateFull)

    let devices = await loadDeviceConfigs(configPath)

    await forEachDevice(
      devices,
      parallel,
      async config => {
        await doDevice(config, stockSrc, customSrc, aapt2Path, buildId, factoryPath, skipCopy, useTemp)
      },
      config => config.device.name,
    )
  }
}
