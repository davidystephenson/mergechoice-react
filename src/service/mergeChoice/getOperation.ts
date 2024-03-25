import { Operation, OperationDictionary } from './merge-choice-types'

export default function getOperation (props: {
  operations: OperationDictionary
  id: number
}): Operation {
  const operation = props.operations[props.id]
  if (operation == null) {
    throw new Error(`There is no operation ${props.id}`)
  }
  return operation
}
