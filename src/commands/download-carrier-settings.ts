import { Command, flags } from '@oclif/command'
import path from 'path'

import { DEVICE_CONFIG_FLAGS, loadDeviceConfigs } from '../config/device'
import { CARRIER_SETTINGS_DIR } from '../config/paths'
import { downloadAllConfigs, decodeConfigs, fetchUpdateConfig } from '../blobs/carrier'
import { forEachDevice } from '../frontend/devices'

export default class DownloadCarrierSettings extends Command {
  static description = 'download updated carrier protobuf configs.'

  static flags = {
    out: flags.string({
      char: 'o',
      description: 'out dir.',
      default: CARRIER_SETTINGS_DIR,
    }),
    debug: flags.boolean({
      description: 'debug output.',
      default: false,
    }),
    prevBuildId: flags.boolean({
      description: 'use build ID of previous image',
      default: false,
    }),
    ...DEVICE_CONFIG_FLAGS,
  }

  async run() {
    let { flags } = this.parse(DownloadCarrierSettings)
    let devices = await loadDeviceConfigs(flags.devices)
    await forEachDevice(
      devices,
      false,
      async config => {
        // skip tangorpro due to lack of mobile connectivity
        if (config.device.name !== 'tangorpro') {
          const build_id = flags.prevBuildId ? config.device.prev_build_id : config.device.build_id
          const updateConfig = await fetchUpdateConfig(config.device.name, build_id, flags.debug)
          if (flags.debug) {
            console.log(updateConfig)
          }
          const outDir = path.join(flags.out, config.device.name)
          await downloadAllConfigs(updateConfig, outDir, flags.debug)
          await decodeConfigs(outDir, path.join(outDir, 'decoded'))
        }
      },
      config => `${config.device.name} ${flags.prevBuildId ? config.device.prev_build_id : config.device.build_id}`,
    )
  }
}
