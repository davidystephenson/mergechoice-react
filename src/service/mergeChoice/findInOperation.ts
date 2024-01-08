import { Operation } from './merge-choice-types'

export default function findInOperation ({
  itemId,
  operations
}: {
  itemId: string
  operations: Operation[]
}): Operation {
  const operation = operations.find(operation => {
    const inputFirst = operation.input.first.some(id => id === itemId)
    if (inputFirst) {
      return true
    }
    const inputSecond = operation.input.second.some(id => id === itemId)
    if (inputSecond) {
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
