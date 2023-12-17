import assert from 'assert'
import chalk from 'chalk'
import cliProgress, { MultiBar } from 'cli-progress'
import { createHash } from 'crypto'
import { createWriteStream, existsSync, promises as fs } from 'fs'
import fetch from 'node-fetch'
import path from 'path'
import { promises as stream } from 'stream'
import { IMAGE_DOWNLOAD_DIR } from '../config/paths'

import { maybePlural } from '../util/cli'
import { ImageType } from './build-index'
import { DeviceImage } from './device-image'
import { runTasksWithLimit } from './paraller-downloader'

export async function downloadDeviceImages(images: DeviceImage[], showTncNotice = true) {
  await fs.mkdir(IMAGE_DOWNLOAD_DIR, { recursive: true })
  if (showTncNotice) {
    logTermsAndConditionsNotice(images)
  }

  const taskProgressBar = new cliProgress.MultiBar(
    {
      format: '    {bar} {percentage}% | {value}/{total} MB | {message}',
      stopOnComplete: true,
      hideCursor: true,
      clearOnComplete: true,
    },
    cliProgress.Presets.shades_classic,
  )

  let currentTaskIndex = 0

  await runTasksWithLimit(
    () => {
      if (currentTaskIndex < images.length) {
        const info = images[currentTaskIndex]
        currentTaskIndex++
        return downloadImage(info, IMAGE_DOWNLOAD_DIR, taskProgressBar)
      }
      return null
    },
    4,
    (error: string) => taskProgressBar.log(`${error} \n`),
  )
}

export async function downloadMissingDeviceImages(images: DeviceImage[]) {
  let missingImages = await DeviceImage.getMissing(images)

  if (missingImages.length > 0) {
    console.log(`Missing image${maybePlural(missingImages)}: ${DeviceImage.arrayToString(missingImages)}`)
    await downloadDeviceImages(missingImages)
  }
}

async function downloadImage(image: DeviceImage, outDir: string, downloadProgressMultiBar: MultiBar) {
  let tmpOutFile = path.join(outDir, image.fileName + '.tmp')
  await fs.rm(tmpOutFile, { force: true })

  let completeOutFile = path.join(outDir, image.fileName)
  assert(!existsSync(completeOutFile), completeOutFile + ' already exists')

  console.log(chalk.bold(chalk.blueBright(`\n${image.deviceConfig.device.name} ${image.buildId} ${image.type}`)))
  console.log(`    ${image.url}`)

  let resp = await fetch(image.url)
  if (!resp.ok) {
    throw new Error(`Error ${resp.status}: ${resp.statusText}`)
  }

  let totalSize = parseInt(resp.headers.get('content-length') ?? '0') / 1e6
  let progress = 0
  const startValue = 0
  const bar = downloadProgressMultiBar.create(totalSize, startValue)
  bar.start(Math.round(totalSize), 0)

  let sha256 = createHash('sha256')

  const message = `${image.deviceConfig.device.name} ${image.buildId} ${image.type}`
  resp.body!.on('data', chunk => {
    sha256.update(chunk)
    progress += chunk.length / 1e6
    bar.update(Math.round(progress), { message: message })
  })

  await stream.pipeline(resp.body!, createWriteStream(tmpOutFile))
  bar.stop()

  let sha256Digest: string = sha256.digest('hex')
  console.log('SHA-256: ' + sha256Digest)
  if (image.skipSha256Check) {
    console.warn('skipping SHA-256 check for ' + completeOutFile)
  } else {
    assert(sha256Digest === image.sha256, 'SHA256 mismatch, expected ' + image.sha256)
  }

  await fs.rename(tmpOutFile, completeOutFile)
}

function logTermsAndConditionsNotice(images: DeviceImage[]) {
  if (
    images.filter(i => {
      return !i.isGrapheneOS && (i.type === ImageType.Factory || i.type === ImageType.Ota)
    }).length == 0
  ) {
    // vendor images show T&C notice themselves as part of unpacking
    return
  }

  console.log(chalk.bold('\nBy downloading images, you agree to Google\'s terms and conditions:'))

  let msg = '    - Factory images: https://developers.google.com/android/images#legal\n'
  if (images.find(i => i.type === ImageType.Ota) !== undefined) {
    msg += '    - OTA images: https://developers.google.com/android/ota#legal\n'
  }
  msg += '    - Beta factory/OTA images: https://developer.android.com/studio/terms\n'

  console.log(msg)
}
