import { createHash } from 'crypto'
import { promises as fs } from 'fs'
import ora from 'ora'

import { BlobEntry } from './entry'

export async function enforceBlobHashRequirements(
  spinner: ora.Ora,
  stockSrc: string,
  entries: BlobEntry[],
  map: Map<string, string[]>,
) {
  for (let entry of entries) {
    let hashes = map.get(entry.srcPath)

    if (hashes == undefined) {
      continue
    }

    spinner.text = entry.path

    let filePath = `${stockSrc}/${entry.srcPath}`
    let fileContents: Buffer = await fs.readFile(filePath)

    let hash: string = createHash('sha256').update(fileContents).digest('hex')

    if (!hashes.includes(hash)) {
      throw new Error(`Unknown hash of ${filePath}: ${hash}`)
    }
  }
}
