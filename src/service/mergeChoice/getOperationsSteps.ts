import getMaximumSteps from './getMaximumSteps'
import { OperationDictionary } from './merge-choice-types'

export default function getOperationsSteps ({ operations }: {
  operations: OperationDictionary
}): number {
  const values = Object.values(operations)
  const steps = values.map(operation => getMaximumSteps({ operation }))
  const maxSteps = Math.max(...steps)
  return maxSteps
}
