import { Item, ItemId, Operation, State } from './merge-choice-types'

export default function createOperation <ListItem extends Item> (props: {
  input?: [ItemId[], ItemId[]]
  output?: ItemId[]
  state: State<ListItem>
}): Operation {
  const operation = {
    mergeChoiceId: props.state.operationCount,
    input: props?.input ?? [[], []],
    output: props?.output ?? []
  }
  props.state.operationCount += 1
  return operation
}
