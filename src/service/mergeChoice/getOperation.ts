import { Operation, Id } from './merge-choice-types'

export default function getOperation (props: {
  operations: Operation[]
  id: Id
}): Operation {
  const operation = props.operations.find(operation => operation.id === props.id)
  if (operation == null) {
    throw new Error(`There is no oepration ${props.id}`)
  }
  return operation
}
