import { Operation } from './merge-choice-types'

export default function getOperationStructure ({
  operations
}: {
  operations: Operation[]
}): number[][] {
  return operations.map(operation => {
    return [operation.input.first.length, operation.input.second.length, operation.output.length]
  })
}
