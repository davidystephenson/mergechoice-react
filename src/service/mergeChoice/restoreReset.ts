import { HistoryEvent, Item, State } from './mergeChoiceTypes'
import resetItem from './resetItem'

export default function restoreReset<ListItem extends Item> (props: {
  event: HistoryEvent<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  if (props.event.reset == null) {
    throw new Error('There is no reset')
  }
  const resetState = resetItem({
    itemId: props.event.reset.item.id,
    state: props.state
  })
  return resetState
}
