import { Id, Input, Operation } from './merge-choice-types'
import createYeastOperation from './createYeastOperation'

export default async function asyncCreateYeastOperation (props?: {
  input?: Input
  output?: Id[]
}): Promise<Operation> {
  return createYeastOperation(props)
}
