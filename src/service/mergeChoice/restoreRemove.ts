import { HistoryEvent, Item, State } from './mergeChoiceTypes'
import removeItem from './removeItem'

export default function restoreRemove<ListItem extends Item> (props: {
  event: HistoryEvent <ListItem>
  state: State<ListItem>
}): State<ListItem> {
  if (props.event.remove == null) {
    throw new Error('There is no remove')
  }
  const removedState = removeItem({
    itemId: props.event.remove.item.id,
    state: props.state
  })
  return removedState
}
