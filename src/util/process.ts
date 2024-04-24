import assert from 'assert'
import child_process, { exec as execCb } from 'child_process'
import util from 'util'

const exec = util.promisify(execCb)

export async function run(command: string) {
  // TODO: stop using shell
  let { stdout } = await exec(command)
  return stdout.trim()
}

export async function aapt2(path: string, ...args: Array<string>) {
  return await run(`${path} ${args.join(' ')}`)
}

export async function spawnAsyncNoOut(
  command: string,
  args: ReadonlyArray<string>,
  isStderrLineAllowed?: (s: string) => boolean,
) {
  let stdout = await spawnAsync(command, args, isStderrLineAllowed)
  assert(stdout.length === 0, `unexpected stdout for ${command} ${args}: ${stdout}`)
}

export async function spawnAsyncStdin(
  command: string,
  args: ReadonlyArray<string>,
  stdinData: Buffer,
  isStderrLineAllowed?: (s: string) => boolean,
) {
  let stdout = await spawnAsync(command, args, isStderrLineAllowed, stdinData)
  return stdout
}

// Returns stdout. If there's stderr output, all lines of it should pass the isStderrLineAllowed check
export async function spawnAsync(
  command: string,
  args: ReadonlyArray<string>,
  isStderrLineAllowed?: (s: string) => boolean,
  stdinData?: Buffer,
  allowedExitCodes: number[] = [0],
) {
  let proc = child_process.spawn(command, args)

  if (stdinData !== undefined) {
    proc.stdin.write(stdinData)
    proc.stdin.end()
  }

  let promise = new Promise((resolve, reject) => {
    let stdoutBufs: Buffer[] = []
    let stderrBufs: Buffer[] = []

    proc.stdout.on('data', data => {
      stdoutBufs.push(data)
    })
    proc.stderr.on('data', data => {
      stderrBufs.push(data)
    })

    proc.on('close', code => {
      let stderr = ''

      if (stderrBufs.length > 0) {
        stderr = Buffer.concat(stderrBufs).toString()
      }

      if (code !== null && allowedExitCodes.includes(code)) {
        if (stderr.length > 0) {
          if (isStderrLineAllowed === undefined) {
            reject(new Error('unexpected stderr ' + stderr))
          } else {
            for (let line of stderr.split('\n')) {
              if (!isStderrLineAllowed(line)) {
                reject(new Error('unexpected stderr line ' + line))
              }
            }
          }
        }
        resolve(Buffer.concat(stdoutBufs).toString())
      } else {
        reject(new Error(proc.spawnargs + ' returned ' + code + (stderr.length > 0 ? ', stderr: ' + stderr : '')))
      }
    })
  })

  return promise as Promise<string>
}
