import { Command, flags } from '@oclif/command'
import { promises as fs } from 'fs'

import { DEVICE_CONFIG_FLAGS, loadDeviceConfigs } from '../config/device'
import { COLLECTED_SYSTEM_STATE_DIR } from '../config/paths'
import { collectSystemState, serializeSystemState } from '../config/system-state'
import { forEachDevice } from '../frontend/devices'

export default class CollectState extends Command {
  static description = 'collect built system state for use with other commands'

  static flags = {
    help: flags.help({ char: 'h' }),
    aapt2: flags.string({
      char: 'a',
      description: 'path to aapt2 executable',
      default: 'out/host/linux-x86/bin/aapt2',
    }),
    outRoot: flags.string({ char: 'r', description: 'path to AOSP build output directory (out/)', default: 'out' }),
    parallel: flags.boolean({
      char: 'p',
      description: 'generate devices in parallel (causes buggy progress spinners)',
      default: false,
    }),
    outPath: flags.string({
      char: 'o',
      description: `output path for system state JSON file(s). If it's a directory, $device.json will be used for file names`,
      required: true,
      default: COLLECTED_SYSTEM_STATE_DIR,
    }),
    ...DEVICE_CONFIG_FLAGS,
  }

  async run() {
    let {
      flags: { aapt2: aapt2Path, devices, outRoot, parallel, outPath },
    } = this.parse(CollectState)

    let configs = await loadDeviceConfigs(devices)

    let isDir = (await fs.stat(outPath)).isDirectory()
    await forEachDevice(
      configs,
      parallel,
      async config => {
        let state = await collectSystemState(config.device.name, outRoot, aapt2Path)

        // Write
        let devicePath = isDir ? `${outPath}/${config.device.name}.json` : outPath
        await fs.writeFile(devicePath, serializeSystemState(state))
      },
      c => c.device.name,
    )
  }
}
