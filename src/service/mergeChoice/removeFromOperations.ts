import cloneOperation from './cloneOperation'
import { Id, Operation, RemovalFromOperations } from './merge-choice-types'

export default function removeFromOperations (props: {
  itemId: Id
  operations: Operation[]
}): RemovalFromOperations {
  let emptiedOperationIndex = -1
  const newOperations = props.operations.map((operation, index) => {
    const newOperation = cloneOperation({ operation })
    const inFirstInput = newOperation.input[0].includes(props.itemId)
    const inSecondInput = newOperation.input[1].includes(props.itemId)
    const inInput = inFirstInput || inSecondInput
    if (!inInput) {
      newOperation.output = newOperation.output.filter(existingId => existingId !== props.itemId)
      return newOperation
    }
    if (inFirstInput) {
      newOperation.input[0] = newOperation.input[0].filter(existingId => existingId !== props.itemId)
      if (newOperation.input[0].length === 0) {
        emptiedOperationIndex = index
        newOperation.output.push(...newOperation.input[1])
        newOperation.input[1] = []
      }
    }
    if (inSecondInput) {
      newOperation.input[1] = newOperation.input[1].filter(existingId => existingId !== props.itemId)
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
