import getOperationsSteps from './getOperationsSteps'
import getRandom from './getRandom'
import getMaximumSteps from './getMaximumSteps'
import range from './range'
import { Operation } from './types'

export default function getOperationIndex ({
  operations
}: {
  operations: Operation[]
}): number {
  const maxSteps = getOperationsSteps({ operations })
  if (maxSteps === 0) {
    throw new Error('All operations are complete.')
  }
  const indices = range(operations.length)
  const maximalIndices = indices.filter(index => {
    const operation = operations[index]
    const steps = getMaximumSteps({ operation })
    return steps === maxSteps
  })
  return getRandom(maximalIndices)
}
