import cloneOperation from './cloneOperation'
import { Id, Operation, RemovalFromOperations } from './merge-choice-types'

export default function removeFromOperations (props: {
  itemId: Id
  operations: Operation[]
}): RemovalFromOperations {
  let emptiedOperationId: Id | undefined
  const newOperations = props.operations.map((operation) => {
    const newOperation = cloneOperation({ operation })
    const inFirstInput = newOperation.input.first.includes(props.itemId)
    const inSecondInput = newOperation.input.second.includes(props.itemId)
    const inInput = inFirstInput || inSecondInput
    if (!inInput) {
      newOperation.output = newOperation.output.filter(existingId => existingId !== props.itemId)
      return newOperation
    }
    if (inFirstInput) {
      newOperation.input.first = newOperation.input.first.filter(existingId => existingId !== props.itemId)
      if (newOperation.input.first.length === 0) {
        emptiedOperationId = operation.id
        newOperation.output.push(...newOperation.input.second)
        newOperation.input.second = []
      }
    }
    if (inSecondInput) {
      newOperation.input.second = newOperation.input.second.filter(existingId => existingId !== props.itemId)
      if (newOperation.input.second.length === 0) {
        emptiedOperationId = operation.id
        newOperation.output.push(...newOperation.input.first)
        newOperation.input.first = []
      }
    }
    return newOperation
  })
  return {
    emptiedOperationId,
    operations: newOperations
  }
}
