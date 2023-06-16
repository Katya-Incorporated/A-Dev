import path from 'path'

import { BlobEntry } from './entry'
import ora from 'ora'
import { Apk } from 'node-apk'

export async function enforceApkMaxVersionRequirements(
  spinner: ora.Ora,
  stockSrc: string,
  entries: BlobEntry[],
  map: Map<string, number>,
) {
  for (let entry of entries) {
    if (path.extname(entry.path) != '.apk') {
      continue
    }

    spinner.text = entry.path

    let apk = new Apk(`${stockSrc}/${entry.srcPath}`)

    let manifestInfo = await apk.getManifestInfo()
    let pkgName = manifestInfo.package
    let versionCode = manifestInfo.versionCode

    let maxVersion = map.get(pkgName)

    if (maxVersion == undefined) {
      continue
    }

    if (versionCode > maxVersion) {
      throw new Error(`${pkgName} version (${versionCode}) is higher than max allowed version (${maxVersion})`)
    }
  }
}
