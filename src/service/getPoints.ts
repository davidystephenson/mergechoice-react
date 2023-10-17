import { Movie, Operation } from '../types'

export default function getPoints ({
  item,
  operations
}: {
  item: Movie
  operations: Operation[]
}): number {
  const operation = operations.find(operation => {
    const input0 = operation.input[0].some(id => id === item.id)
    if (input0) {
      return true
    }
    const input1 = operation.input[1].some(id => id === item.id)
    if (input1) {
      return true
    }
    const output = operation.output.some(id => id === item.id)
    if (output) {
      return true
    }
    return false
  })
  if (operation == null) {
    throw new Error('The item is not in any operation.')
  }
  const input0 = operation.input[0].some(id => id === item.id)
  if (input0) {
    return operation.input[0].indexOf(item.id) + operation.output.length
  }
  const input1 = operation.input[1].some(id => id === item.id)
  if (input1) {
    return operation.input[1].indexOf(item.id) + operation.output.length
  }
  const output = operation.output.some(id => id === item.id)
  if (output) {
    return operation.output.indexOf(item.id)
  }
  throw new Error('The item is not in the found operation.')
}
