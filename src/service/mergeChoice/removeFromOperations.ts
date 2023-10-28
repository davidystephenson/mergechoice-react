import { Operation, RemovalFromOperations } from '../../types'
import clone from './clone'

export default function removeFromOperations ({
  itemId,
  operations
}: {
  itemId: string
  operations: Operation[]
}): RemovalFromOperations {
  let emptiedOperationIndex = -1
  const newOperations = operations.map((operation, index) => {
    const newOperation = clone(operation)
    const inFirstInput = newOperation.input[0].includes(itemId)
    const inSecondInput = newOperation.input[1].includes(itemId)
    const inInput = inFirstInput || inSecondInput
    if (!inInput) {
      newOperation.output = newOperation.output.filter(existingId => existingId !== itemId)
      return newOperation
    }
    if (inFirstInput) {
      newOperation.input[0] = newOperation.input[0].filter(existingId => existingId !== itemId)
      if (newOperation.input[0].length === 0) {
        emptiedOperationIndex = index
        newOperation.output.push(...newOperation.input[1])
        newOperation.input[1] = []
      }
    }
    if (inSecondInput) {
      newOperation.input[1] = newOperation.input[1].filter(existingId => existingId !== itemId)
      if (newOperation.input[1].length === 0) {
        emptiedOperationIndex = index
        newOperation.output.push(...newOperation.input[0])
        newOperation.input[1] = []
      }
    }
    return newOperation
  })
  return {
    emptiedOperationIndex,
    operations: newOperations
  }
}
