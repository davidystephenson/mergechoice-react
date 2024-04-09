import { Operation, OperationDictionary } from './mergeChoiceTypes'

export default function getOperation (props: {
  operations: OperationDictionary
  itemId: number
}): Operation {
  const operation = props.operations[props.itemId]
  if (operation == null) {
    throw new Error(`There is no operation ${props.itemId}`)
  }
  return operation
}
