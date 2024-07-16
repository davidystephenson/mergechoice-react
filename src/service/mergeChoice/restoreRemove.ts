import { HistoryRemoveData, Item, State } from './mergeChoiceTypes'
import removeItem from './removeItem'

export default function restoreRemove<ListItem extends Item> (props: {
  input: HistoryRemoveData<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  const removedState = removeItem({
    itemId: props.input.item.id,
    state: props.state
  })
  return removedState
}
