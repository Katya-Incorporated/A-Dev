import assert from 'assert'
import chalk from 'chalk'
import child_proc from 'child_process'
import ora from 'ora'
import path from 'path'

import { spawnAsync } from './process'

export type ProgressCallback = (progress: string) => void

export function createActionSpinner(action: string) {
  return ora({
    prefixText: chalk.bold(action),
  })
}

export function startActionSpinner(action: string) {
  return createActionSpinner(action).start()
}

export function stopActionSpinner(spinner: ora.Ora) {
  spinner.stopAndPersist()
}

export async function withSpinner<Return>(action: string, callback: (spinner: ora.Ora) => Promise<Return>) {
  let spinner = startActionSpinner(action)
  let ret = await callback(spinner)
  stopActionSpinner(spinner)

  return ret
}

export function maybePlural<T>(arr: ArrayLike<T>, singleEnding = '', multiEnding = 's') {
  let len = arr.length
  assert(len > 0)
  return len > 1 ? multiEnding : singleEnding
}

export function gitDiff(path1: string, path2: string) {
  return spawnAsync('git', ['diff', '--color=always', path1, path2], undefined, undefined, [0, 1])
}

export function showGitDiff(repoPath: string, filePath?: string) {
  let args = ['-C', repoPath, `diff`]
  if (filePath !== undefined) {
    args.push(path.relative(repoPath, filePath))
  }

  let ret = child_proc.spawnSync('git', args, { stdio: 'inherit' })
  assert(ret.status === 0)
}
