import { ItemId, Operation } from './merge-choice-types'
import createYeastOperation from './createYeastOperation'

export default async function asyncCreateYeastOperation (props?: {
  input?: [ItemId[], ItemId[]]
  output?: ItemId[]
}): Promise<Operation> {
  return createYeastOperation(props)
}
