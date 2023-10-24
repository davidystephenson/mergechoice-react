import { Operation } from '../types'
import getMaximumSteps from './getMaximumSteps'

export default function getOperationsSteps ({ operations }: {
  operations: Operation[]
}): number {
  const maxSteps = Math.max(...operations.map(operation => getMaximumSteps({ operation })))
  return maxSteps
}
