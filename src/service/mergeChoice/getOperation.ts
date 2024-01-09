import { Operation, Id, OperationDictionary } from './merge-choice-types'

export default function getOperation (props: {
  operations: OperationDictionary
  id: Id
}): Operation {
  const operation = props.operations[props.id]
  if (operation == null) {
    throw new Error(`There is no oepration ${props.id}`)
  }
  return operation
}
