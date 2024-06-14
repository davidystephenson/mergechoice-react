import { HistoryResetData, Item, State } from './mergeChoiceTypes'
import resetItem from './resetItem'

export default function restoreReset<ListItem extends Item> (props: {
  data: HistoryResetData<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  const resetState = resetItem({
    itemId: props.data.item.id,
    state: props.state
  })
  return resetState
}
