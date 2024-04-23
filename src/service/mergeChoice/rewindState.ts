import { ItemId, Item, State } from './mergeChoiceTypes'

export default function rewindState <ListItem extends Item> (props: {
  historyEventId: ItemId
  state: State<ListItem>
}): State<ListItem> {
  return props.state
}
