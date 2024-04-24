import path from 'path'
import fetch from 'node-fetch'
import os from 'os'
import chalk from 'chalk'

import { Response } from '../proto-ts/vendor/adevtool/assets/response'
import { Request } from '../proto-ts/vendor/adevtool/assets/request'
import { CarrierList } from '../proto-ts/packages/apps/CarrierConfig2/src/com/google/carrier/carrier_list'
import {
  MultiCarrierSettings,
  CarrierSettings,
} from '../proto-ts/packages/apps/CarrierConfig2/src/com/google/carrier/carrier_settings'
import { exists, listFilesRecursive, TMP_PREFIX } from '../util/fs'
import assert from 'assert'
import { createWriteStream, promises as fs } from 'fs'
import { promises as stream } from 'stream'
import { spawnAsyncStdin } from '../util/process'
import { OS_CHECKOUT_DIR } from '../config/paths'

const PROTO_PATH = `${OS_CHECKOUT_DIR}/packages/apps/CarrierConfig2/src/com/google/carrier`

function getRandom(): string {
  return `${Math.random()}`.slice(2, 10)
}

export async function fetchUpdateConfig(
  device: string,
  build_id: string,
  debug: boolean,
): Promise<Map<string, string>> {
  const requestData: Request = {
    field1: {
      info: {
        int: 4,
        deviceInfo: {
          apilevel: 34,
          name: device,
          buildId: build_id,
          name1: device,
          name2: device,
          locale1: 'en',
          locale2: 'US',
          manufacturer1: 'Google',
          manufacturer2: 'google',
          name3: device,
        },
      },
    },
    field2: {
      info: {
        pkgname: 'com.google.android.carrier',
      },
    },
  }
  const tmpDir = path.join(os.tmpdir(), `${TMP_PREFIX}${getRandom()}`)
  if (debug) console.log(`tmpDir: ${tmpDir}`)
  fs.mkdir(tmpDir, { recursive: true })
  const outFile = path.join(tmpDir, getRandom())
  if (debug) console.log(`outFile: ${outFile}`)
  await fs.writeFile(outFile, JSON.stringify(Request.toJSON(requestData), null, 4))
  const encodedRequest = Request.encode(requestData).finish()
  const reqFile = path.join(tmpDir, getRandom())
  await fs.writeFile(reqFile, encodedRequest)
  if (debug) console.log(`reqFile: ${reqFile}`)
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-protobuf',
    },
    body: encodedRequest,
  }
  const response = await fetch(
    'https://www.googleapis.com/experimentsandconfigs/v1/getExperimentsAndConfigs?r=6&c=1',
    options,
  )
  assert(response.ok)
  const tmpOutFile = path.join(tmpDir, getRandom())
  if (debug) console.log(`tmpOutFile: ${tmpOutFile}`)
  await stream.pipeline(response.body, createWriteStream(tmpOutFile))
  let result = new Map<string, string>()
  const decodedResopnse = Response.decode(await fs.readFile(tmpOutFile)).field1!.settings!.cfg!
  fs.rm(tmpDir, { force: true, recursive: true })
  decodedResopnse.forEach(cfg => {
    if (cfg.name === 'CarrierSettings__update_config') {
      const updateConfig = cfg!.unk1!.n!.entry!
      Object.keys(updateConfig).forEach(key => {
        result.set(key, updateConfig[key])
      })
    }
  })
  return result
}

export async function downloadAllConfigs(config: Map<string, string>, outDir: string, debug: boolean) {
  if ((config.has('is_pixel') && config.get('is_pixel') === 'no_ota') || config.size <= 2) {
    console.log(chalk.grey(`No updates are available for ${path.parse(outDir).base}`))
    return
  }
  const clBaseUrl = config.has('carrier_list_url') ? (config.get('carrier_list_url') as string) : ''
  const csBaseUrl = config.has('carrier_settings_url') ? (config.get('carrier_settings_url') as string) : ''
  for (let [carrier, version] of config) {
    if (carrier === 'carrier_list_url' || carrier === 'carrier_settings_url') {
      continue
    }
    let url: string
    if (carrier === 'carrier_list') {
      url = clBaseUrl.replace(/%d/g, version)
    } else {
      url = csBaseUrl.replace(/%2\$s/i, carrier).replace(/%3\$d/i, version)
    }
    if (debug) console.log(url)
    assert(url.includes('pixel'), 'carrier_settings_url is invalid')
    let tmpOutFile = path.join(outDir, `${carrier}.pb.tmp`)
    let outFile = path.join(outDir, `${carrier}.pb`)
    if (!(await exists(outDir))) await fs.mkdir(outDir, { recursive: true })
    await fs.rm(tmpOutFile, { force: true })
    let resp = await fetch(url)
    if (resp.ok) {
      await stream.pipeline(resp.body!, createWriteStream(tmpOutFile))
      await fs.rename(tmpOutFile, outFile)
      console.log(`Downloaded ${carrier}-${version} to ${outFile}`)
    } else {
      console.log(chalk.red(`Failed to download ${carrier}-${version}\nurl: ${url}`))
    }
  }
}

export async function decodeConfigs(cfgPath: string, outDir: string) {
  const cmd = 'protoc'
  if (await exists(cfgPath)) {
    for await (let file of listFilesRecursive(cfgPath)) {
      if (path.extname(file) != '.pb') {
        continue
      }
      const filename = path.parse(file).name
      const args: string[] = ['--proto_path', PROTO_PATH, '--decode']
      switch (filename) {
        case 'others':
          args.push('com.google.carrier.MultiCarrierSettings')
          args.push(`${PROTO_PATH}/carrier_settings.proto`)
          break
        case 'carrier_list':
          args.push('com.google.carrier.CarrierList')
          args.push(`${PROTO_PATH}/carrier_list.proto`)
          break
        default:
          args.push('com.google.carrier.CarrierSettings')
          args.push(`${PROTO_PATH}/carrier_settings.proto`)
          break
      }
      const decoded = await spawnAsyncStdin(cmd, args, await fs.readFile(file))
      const outFile = path.join(outDir, filename)
      if (!(await exists(outDir))) await fs.mkdir(outDir, { recursive: true })
      await fs.writeFile(outFile, decoded)
    }
  }
}

export async function getVersionsMap(dir: string): Promise<Map<string, number>> {
  assert(await exists(dir))
  let versions = new Map<string, number>()
  for await (let file of listFilesRecursive(dir)) {
    if (path.extname(file) != '.pb') {
      continue
    }
    const filename = path.parse(file).name
    const data = await fs.readFile(file)
    let decoded: MultiCarrierSettings | CarrierSettings | CarrierList
    switch (filename) {
      case 'others':
        decoded = MultiCarrierSettings.decode(data)
        break
      case 'carrier_list':
        decoded = CarrierList.decode(data)
        break
      default:
        decoded = CarrierSettings.decode(data)
    }
    const version = Number(decoded.version)
    versions.set(file, version)
  }
  return versions
}
