import { Operation } from './merge-choice-types'

export default function getMinimumSteps ({ operation }: {
  operation: Operation
}): number {
  return Math.min(operation.input.first.length, operation.input.second.length)
}
