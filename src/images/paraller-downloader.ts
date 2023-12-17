export async function runTasksWithLimit<T>(
  tasksArgs: () => Promise<T> | null,
  maxConcurrency: number,
  onError: (error: string) => void,
) {
  const runningTasks: Set<Promise<T>> = new Set()
  const results: T[] = []

  function startNextTask() {
    if (runningTasks.size < maxConcurrency) {
      const promise = tasksArgs()
      if (promise === null) return

      runningTasks.add(promise)

      promise
        .then((result: T) => {
          results.push(result)
          runningTasks.delete(promise)
          startNextTask()
        })
        .catch(error => {
          onError(error)
          runningTasks.delete(promise)
          startNextTask()
        })
    }
  }

  // Start initial tasks
  for (let i = 0; i < maxConcurrency; i++) {
    startNextTask()
  }

  while (runningTasks.size > 0) {
    await Promise.allSettled(runningTasks.values())
  }

  return results
}
