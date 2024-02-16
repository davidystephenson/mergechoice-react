import { Operation } from './merge-choice-types'

export default function cloneOperation ({
  operation
}: {
  operation: Operation
}): Operation {
  const input = operation.input.map(input => [...input])
  const output = [...operation.output]
  const newOperation: Operation = {
    mergeChoiceId: operation.mergeChoiceId,
    input,
    output
  }
  return newOperation
}
