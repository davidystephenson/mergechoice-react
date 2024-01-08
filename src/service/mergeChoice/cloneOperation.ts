import { Operation } from './merge-choice-types'

export default function cloneOperation ({
  operation
}: {
  operation: Operation
}): Operation {
  const first = [...operation.input.first]
  const second = [...operation.input.second]
  const input = { first, second }
  const output = [...operation.output]
  const newOperation: Operation = {
    id: operation.id,
    input,
    output
  }
  return newOperation
}
