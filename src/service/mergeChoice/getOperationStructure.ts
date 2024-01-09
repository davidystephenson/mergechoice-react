import { OperationDictionary } from './merge-choice-types'

export default function getOperationStructure ({
  operations
}: {
  operations: OperationDictionary
}): number[][] {
  const values = Object.values(operations)
  return values.map(operation => {
    return [operation.input[0].length, operation.input[1].length, operation.output.length]
  })
}
