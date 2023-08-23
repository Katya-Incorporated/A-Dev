import assert from 'assert'
import path from 'path'

export const OS_CHECKOUT_DIR = getOsCheckoutDir()

function getOsCheckoutDir(): string {
  let scriptDir = '/vendor/adevtool/src/config'
  assert(__dirname.endsWith(scriptDir))
  return __dirname.substring(0, __dirname.length - scriptDir.length)
}

export const ADEVTOOL_DIR = path.join(OS_CHECKOUT_DIR, 'vendor/adevtool')

export const CONFIG_DIR = process.env['ADEVTOOL_CONFIG_DIR'] ?? path.join(ADEVTOOL_DIR, 'config')
export const DEVICE_CONFIG_DIR = path.join(CONFIG_DIR, 'device')

export const BUILD_INDEX_DIR = path.join(CONFIG_DIR, 'build-index')
export const BUILD_INDEX_FILE = path.join(BUILD_INDEX_DIR, 'build-index.yml')
export const MAIN_BUILD_INDEX_PART = path.join(BUILD_INDEX_DIR, 'build-index-main.yml')
