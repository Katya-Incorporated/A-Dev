// Breaks build with import, needed for structuredClone definition
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
///<reference path="../util/jstypes.d.ts" />

import assert from 'assert'
import path from 'path'

import { loadAndMergeConfig } from './config-loader'
import { FilterMode, Filters, SerializedFilters } from './filters'

export enum ConfigType {
  Device = 'device',
  DeviceList = 'device-list',
}

export interface DeviceConfig {
  // Required
  device: {
    name: string
    vendor: string
  }

  platform: {
    namespaces: string[]
    sepolicy_dirs: string[]
    product_makefile: string // required
  }

  generate: {
    overrides: boolean
    presigned: boolean
    flat_apex: boolean
    files: boolean
    props: boolean
    sepolicy_dirs: boolean
    overlays: boolean
    vintf: boolean
    factory_firmware: boolean
    ota_firmware: boolean // not yet implemented
    products: boolean
  }

  // Not part of the final config
  // includes: string[]

  filters: {
    props: Filters
    overlay_keys: Filters
    overlay_values: Filters
    overlay_files: Filters
    partitions: Filters
    presigned: Filters
    sepolicy_dirs: Filters
    dep_files: Filters
    files: Filters
    deprivileged_apks: Filters
  }
}

interface DeviceListConfig {
  type: ConfigType.DeviceList
  devices: string[] // config paths

  // Not part of the final config
  // includes: string[]
}

// Untyped because this isn't a full config
export const EMPTY_FILTERS = {
  mode: FilterMode.Exclude,
  match: [],
  prefix: [],
  suffix: [],
  substring: [],
  regex: [],
} as SerializedFilters
// Same, but defaults to inclusion list
export const EMPTY_INCLUDE_FILTERS = {
  ...structuredClone(EMPTY_FILTERS),
  mode: FilterMode.Include,
} as SerializedFilters

const DEFAULT_CONFIG_BASE = {
  type: ConfigType.Device,
  platform: {
    namespaces: [],
    sepolicy_dirs: [],
  },
  generate: {
    overrides: true,
    presigned: true,
    flat_apex: false, // currently broken
    files: true,
    props: true,
    sepolicy_dirs: true,
    overlays: true,
    vintf: true,
    factory_firmware: true,
    ota_firmware: true,
    products: true,
  },
  filters: {
    props: structuredClone(EMPTY_FILTERS),
    overlay_keys: structuredClone(EMPTY_FILTERS),
    overlay_values: structuredClone(EMPTY_FILTERS),
    overlay_files: structuredClone(EMPTY_FILTERS),
    partitions: structuredClone(EMPTY_FILTERS),
    presigned: structuredClone(EMPTY_INCLUDE_FILTERS),
    sepolicy_dirs: structuredClone(EMPTY_FILTERS),
    dep_files: structuredClone(EMPTY_INCLUDE_FILTERS),
    files: structuredClone(EMPTY_FILTERS),
    deprivileged_apks: structuredClone(EMPTY_INCLUDE_FILTERS),
  },
}

async function loadAndMergeDeviceConfig(configPath: string) {
  return await loadAndMergeConfig(configPath, DEFAULT_CONFIG_BASE)
}

export async function loadDeviceConfigs(configPath: string) {
  let merged = await loadAndMergeDeviceConfig(configPath)
  let { type } = merged
  delete merged.type

  if (type == ConfigType.Device) {
    let configName = path.basename(configPath, '.yml')
    let deviceName = merged.device.name
    assert(configName === deviceName, `config name doesn't match device name (${deviceName}): ${configPath}`)
    return [merged as DeviceConfig]
  }
  if (type == ConfigType.DeviceList) {
    // Load all the device configs
    let list = merged as DeviceListConfig
    let devices: DeviceConfig[] = []
    for (let devicePath of list.devices) {
      devicePath = path.resolve(path.dirname(configPath), devicePath)
      devices.push(await loadAndMergeDeviceConfig(devicePath))
    }

    return devices
  }
  throw new Error(`Unknown config type ${type}`)
}
