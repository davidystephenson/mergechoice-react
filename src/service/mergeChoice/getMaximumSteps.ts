import { Operation } from './merge-choice-types'

export default function getMaximumSteps ({ operation }: {
  operation: Operation
}): number {
  return Math.max(0, operation.input.first.length + operation.input.second.length - 1)
}
