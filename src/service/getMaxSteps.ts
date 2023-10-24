import { Operation } from '../types'
import getSteps from './getSteps'

export default function getMaxSteps ({ operations }: {
  operations: Operation[]
}): number {
  const maxSteps = Math.max(...operations.map(operation => getSteps({ operation })))
  return maxSteps
}
