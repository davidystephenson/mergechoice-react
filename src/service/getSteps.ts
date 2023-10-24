import { Operation } from '../types'

export default function getSteps ({ operation }: {
  operation: Operation
}): number {
  return Math.max(operation.input[0].length, operation.input[1].length)
}
