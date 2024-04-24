import { Command, flags } from '@oclif/command'
import path from 'path'

import { DEVICE_CONFIG_FLAGS, loadDeviceConfigs } from '../config/device'
import { CARRIER_SETTINGS_DIR } from '../config/paths'
import { downloadAllConfigs, decodeConfigs, fetchUpdateConfig } from '../blobs/carrier'
import { forEachDevice } from '../frontend/devices'

export default class UpdateCarrierSettings extends Command {
  static description = 'download updated carrier protobuf configs.'

  static flags = {
    out: flags.string({
      char: 'o',
      description: 'out dir.',
      default: CARRIER_SETTINGS_DIR,
    }),
    generateDumps: flags.boolean({
      char: 'g',
      description: `generate protoc dumps of downlaoded configs`,
      default: false,
    }),
    debug: flags.boolean({
      description: 'debug output.',
      default: false,
    }),
    buildId: flags.string({
      description: 'specify build ID',
      char: 'b',
    }),
    ...DEVICE_CONFIG_FLAGS,
  }

  async run() {
    let { flags } = this.parse(UpdateCarrierSettings)
    let devices = await loadDeviceConfigs(flags.devices)
    await forEachDevice(
      devices,
      false,
      async config => {
        // skip tangorpro due to lack of mobile connectivity
        if (config.device.name !== 'tangorpro') {
          const buildId = flags.buildId !== undefined ? flags.buildId : config.device.build_id
          const outDir = path.join(flags.out, config.device.name)
          const updateConfig = await fetchUpdateConfig(config.device.name, buildId, flags.debug)
          if (flags.debug) console.log(updateConfig)
          await downloadAllConfigs(updateConfig, outDir, flags.debug)
          if (flags.generateDumps) await decodeConfigs(outDir, path.join(outDir, 'decoded'))
        } else {
          this.log('tangorpro is not supported due to lack of mobile connectivity')
        }
      },
      config => `${config.device.name} ${flags.buildId !== undefined ? flags.buildId : config.device.build_id}`,
    )
  }
}
