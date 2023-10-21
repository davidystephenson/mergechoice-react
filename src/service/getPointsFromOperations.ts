import { Operation } from '../types'

export default function getPointsFromOperations ({
  itemId,
  operations
}: {
  itemId: string
  operations: Operation[]
}): number {
  for (const operation of operations) {
    const input0 = operation.input[0].some(id => id === itemId)
    if (input0) {
      return operation.input[0].indexOf(itemId) + operation.output.length
    }
    const input1 = operation.input[1].some(id => id === itemId)
    if (input1) {
      return operation.input[1].indexOf(itemId) + operation.output.length
    }
    const output = operation.output.some(id => id === itemId)
    if (output) {
      return operation.output.indexOf(itemId)
    }
  }
  throw new Error('The item is not any operation.')
}
