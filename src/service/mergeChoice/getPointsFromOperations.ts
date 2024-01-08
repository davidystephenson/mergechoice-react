import { Id, Operation } from './merge-choice-types'

export default function getPointsFromOperations (props: {
  itemId: Id
  operations: Operation[]
}): number {
  for (const operation of props.operations) {
    const inputFirst = operation.input.first.some(id => id === props.itemId)
    if (inputFirst) {
      return operation.input.first.indexOf(props.itemId) + operation.output.length
    }
    const inputSecond = operation.input.second.some(id => id === props.itemId)
    if (inputSecond) {
      return operation.input.second.indexOf(props.itemId) + operation.output.length
    }
    const output = operation.output.some(id => id === props.itemId)
    if (output) {
      return operation.output.indexOf(props.itemId)
    }
  }
  return NaN
}
