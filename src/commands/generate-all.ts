import { Command, flags } from '@oclif/command'
import assert from 'assert'
import chalk from 'chalk'
import path from 'path'

import { createVendorDirs, VendorDirectories } from '../blobs/build'
import { copyBlobs } from '../blobs/copy'
import { BlobEntry } from '../blobs/entry'
import { DEVICE_CONFIG_FLAGS, DeviceBuildId, DeviceConfig, getDeviceBuildId, loadDeviceConfigs } from '../config/device'
import { ADEVTOOL_DIR, COLLECTED_SYSTEM_STATE_DIR } from '../config/paths'
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
import { writeReadme } from '../frontend/readme'
import { DeviceImages, prepareDeviceImages, WRAPPED_SOURCE_FLAGS, wrapSystemSrc } from '../frontend/source'
import { BuildIndex, ImageType, loadBuildIndex } from '../images/build-index'
import { SelinuxPartResolutions } from '../selinux/contexts'
import { withSpinner } from '../util/cli'
import { withTempDir } from '../util/fs'
import { spawnAsync } from '../util/process'

const doDevice = (
  dirs: VendorDirectories,
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
      default: COLLECTED_SYSTEM_STATE_DIR,
    }),
    factoryPath: flags.string({
      char: 'f',
      description: 'path to stock factory images zip (for extracting firmware if stockSrc is not factory images)',
    }),
    otaPath: flags.string({
      char: 'o',
      description: 'path to OTA image, used only for extract_android_ota_payload.py',
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

    skipOtaExtraction: flags.boolean({
      description:
        'skip extract_android_ota_payload.py step. Allows to skip downloading OTA image when OTA generation is not needed',
    }),

    ...WRAPPED_SOURCE_FLAGS,
    ...DEVICE_CONFIG_FLAGS,
  }

  static {
    GenerateFull.flags.stockSrc.required = false
  }

  async run() {
    let { flags } = this.parse(GenerateFull)

    let devices = await loadDeviceConfigs(flags.devices)

    let images: Map<DeviceBuildId, DeviceImages>

    let useImagesFromConfig = flags.stockSrc === undefined

    if (useImagesFromConfig) {
      let requiredImageTypes = flags.skipOtaExtraction ? [ImageType.Factory] : [ImageType.Factory, ImageType.Ota]

      let index: BuildIndex = await loadBuildIndex()
      images = await prepareDeviceImages(index, requiredImageTypes, devices)
      assert(flags.otaPath === undefined)
      assert(flags.buildId === undefined)
      assert(flags.factoryPath === undefined)
      assert(!flags.useTemp)
    } else {
      if (!flags.skipOtaExtraction) {
        assert(flags.otaPath !== undefined, '--otaPath is not specified and --skipOtaExtraction is not set')
      }
    }

    await forEachDevice(
      devices,
      flags.parallel,
      async config => {
        let deviceBuildId: string | undefined
        let otaPath: string | undefined
        let stockSrc: string
        let factoryPath: string | undefined
        if (useImagesFromConfig) {
          let deviceImages = images.get(getDeviceBuildId(config))!
          stockSrc = deviceImages.unpackedFactoryImageDir
          factoryPath = deviceImages.factoryImage.getPath()
          let otaImage = deviceImages.otaImage
          if (otaImage !== undefined) {
            otaPath = otaImage.getPath()
          } else {
            assert(flags.skipOtaExtraction)
          }
        } else {
          stockSrc = flags.stockSrc!
          factoryPath = flags.factoryPath
          deviceBuildId = flags.buildId
          otaPath = flags.otaPath
        }

        // Prepare output directories
        let vendorDirs = await createVendorDirs(config.device.vendor, config.device.name)

        await doDevice(
          vendorDirs,
          config,
          stockSrc,
          flags.customSrc,
          flags.aapt2,
          deviceBuildId,
          factoryPath,
          flags.skipCopy,
          flags.useTemp,
        )

        if (!flags.skipOtaExtraction) {
          this.log(chalk.bold('Running extract_android_ota_payload.py'))
          // TODO: extract these files from bootloader.img instead of from full OTA image
          let cmd = path.join(ADEVTOOL_DIR, 'external/extract_android_ota_payload/extract_android_ota_payload.py')
          await spawnAsync(cmd, [otaPath!, vendorDirs.firmware])
        }
      },
      config => config.device.name,
    )
  }
}
