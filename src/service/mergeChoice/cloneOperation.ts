import { Operation } from './types'

export default function cloneOperation ({
  operation
}: {
  operation: Operation
}): Operation {
  const newOperation: Operation = {
    input: operation.input.map(input => [...input]),
    output: [...operation.output]
  }
  return newOperation
}
