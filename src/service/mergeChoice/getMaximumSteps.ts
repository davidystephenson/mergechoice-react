import { Operation } from './types'

export default function getMaximumSteps ({ operation }: {
  operation: Operation
}): number {
  return Math.max(0, operation.input[0].length + operation.input[1].length - 1)
}
