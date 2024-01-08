import { Id, Operation } from './merge-choice-types'
import createYeastOperation from './createYeastOperation'

export default async function asyncCreateYeastOperation (props?: {
  input?: [Id[], Id[]]
  output?: Id[]
}): Promise<Operation> {
  return createYeastOperation(props)
}
