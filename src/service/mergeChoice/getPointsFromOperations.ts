import { Id, Operation } from './merge-choice-types'

export default function getPointsFromOperations (props: {
  itemId: Id
  operations: Operation[]
}): number {
  for (const operation of props.operations) {
    const input0 = operation.input[0].some(id => id === props.itemId)
    if (input0) {
      return operation.input[0].indexOf(props.itemId) + operation.output.length
    }
    const input1 = operation.input[1].some(id => id === props.itemId)
    if (input1) {
      return operation.input[1].indexOf(props.itemId) + operation.output.length
    }
    const output = operation.output.some(id => id === props.itemId)
    if (output) {
      return operation.output.indexOf(props.itemId)
    }
  }
  return NaN
}
