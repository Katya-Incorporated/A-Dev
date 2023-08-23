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
