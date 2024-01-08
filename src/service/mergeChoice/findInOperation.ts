import { Operation } from './merge-choice-types'

export default function findInOperation ({
  itemId,
  operations
}: {
  itemId: string
  operations: Operation[]
}): Operation {
  const operation = operations.find(operation => {
    const input0 = operation.input[0].some(id => id === itemId)
    if (input0) {
      return true
    }
    const input1 = operation.input[1].some(id => id === itemId)
    if (input1) {
      return true
    }
    const output = operation.output.some(id => id === itemId)
    if (output) {
      return true
    }
    return false
  })
  if (operation == null) {
    throw new Error('The item is not any operation.')
  }
  return operation
}
