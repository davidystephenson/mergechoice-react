import getItem from './getItem'
import { Item, ItemId, State } from './mergeChoiceTypes'
import removeItem from './removeItem'

export default function archiveItem <ListItem extends Item> (props: {
  itemId: ItemId
  state: State<ListItem>
}): State<ListItem> {
  const item = getItem({ itemId: props.itemId, items: props.state.items })
  const removedState = removeItem({
    itemId: props.itemId,
    silent: true,
    state: props.state
  })
  item.seeding = true
  removedState.archive[item.id] = item
  return removedState
}
