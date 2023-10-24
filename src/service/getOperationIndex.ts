import { Operation } from '../types'
import getMaxSteps from './getMaxSteps'
import getRandom from './getRandom'
import getSteps from './getSteps'
import range from './range'

export default function getOperationIndex ({
  operations
}: {
  operations: Operation[]
}): number {
  const maxSteps = getMaxSteps({ operations })
  if (maxSteps === 0) {
    throw new Error('All operations are complete.')
  }
  const indices = range(operations.length)
  const maximalIndices = indices.filter(index => {
    const operation = operations[index]
    const steps = getSteps({ operation })
    return steps === maxSteps
  })
  return getRandom(maximalIndices)
}
