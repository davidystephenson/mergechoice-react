import { Identified, ItemData, State } from './mergeChoiceTypes'

export default function createItem <ListItemData extends ItemData> (props: {
  item: ListItemData
  state: State<Identified<ListItemData>>
}): Identified<ListItemData> {
  const newItem = {
    ...props.item,
    mergeChoiceId: props.state.itemCount
  }
  props.state.itemCount += 1
  return newItem
}
