import { HistoryEvent, Item, State } from './mergeChoiceTypes'
import unarchiveItem from './unarchiveItem'

export default function restoreUnarchive <ListItem extends Item> (props: {
  event: HistoryEvent<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  if (props.event.unarchive == null) {
    throw new Error('There is no unarchive')
  }
  const resetState = unarchiveItem({
    itemId: props.event.unarchive.item.id,
    state: props.state
  })
  return resetState
}
