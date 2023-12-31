import getMaximumSteps from './getMaximumSteps'
import { Operation } from './types'

export default function getOperationsSteps ({ operations }: {
  operations: Operation[]
}): number {
  const maxSteps = Math.max(...operations.map(operation => getMaximumSteps({ operation })))
  return maxSteps
}
