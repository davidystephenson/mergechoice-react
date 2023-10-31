import { Operation } from './types'

export default function getOperationStructure ({
  operations
}: {
  operations: Operation[]
}): number[][] {
  return operations.map(operation => {
    return [operation.input[0].length, operation.input[1].length, operation.output.length]
  })
}
