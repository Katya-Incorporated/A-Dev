import { flags } from "@oclif/command"
import chalk from "chalk"

export enum DiffTypes {
    ALL = 'all',
    ADDED = 'added',
    REMOVED = 'removed',
}

export interface DiffList {
    partition: string
    added: Array<string>
    removed: Array<string>
}

export interface DiffMap {
    partition: string
    added: Map<string, string>
    modified: Map<string, Array<string>>
    removed: Map<string, string>
}

export const DIFF_FLAGS = {
    help: flags.help({ char: 'h' }),
    type: flags.enum({
        char: 't',
        description: 'output type of diff',
        options: Object.values(DiffTypes),
        default: DiffTypes.ALL,
    }),
}

export function printDiffList(
    diffs: DiffList[],
    type: DiffTypes,
    callback: (message?: string) => void,
) {
    let showAdded = [DiffTypes.ALL, DiffTypes.ADDED].includes(type)
    let showRemoved = [DiffTypes.ALL, DiffTypes.REMOVED].includes(type)

    for (let diff of diffs) {
        callback(chalk.bold(diff.partition))

        if (showAdded) {
            diff.added.forEach((value) => callback(chalk.green(`+ ${value}`)))
        }
        if (showRemoved) {
            diff.removed.forEach((value) => callback(chalk.red(`- ${value}`)))
        }

        callback()
    }
}

export function printDiffMap(
    diffs: DiffMap[],
    type: DiffTypes,
    callback: (message?: string) => void,
) {
    let showAddedAndModified = [DiffTypes.ALL, DiffTypes.ADDED].includes(type)
    let showRemoved = [DiffTypes.ALL, DiffTypes.REMOVED].includes(type)

    for (let diff of diffs) {
        callback(chalk.bold(diff.partition))

        if (showAddedAndModified) {
            diff.added.forEach((value, key) => {
                callback(chalk.green(`+ ${key}=${chalk.bold(value)}`))
            })
            diff.modified.forEach(([oldValue, newValue], key) => {
                callback(`${key}=${chalk.bold(oldValue)} -> ${chalk.bold(chalk.bold.blue(newValue))}`)
            })
        }
        if (showRemoved) {
            diff.removed.forEach((value, key) => {
                callback(chalk.red(`- ${key}=${chalk.bold(value)}`))
            })
        }

        callback()
    }
}
