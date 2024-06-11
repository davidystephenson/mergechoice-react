import { HistoryData, HistoryEvent, Item, State } from './mergeChoiceTypes'

export default function addEvent<ListItem extends Item> (props: {
  data: HistoryData<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  const newHistoryEvent: HistoryEvent<ListItem> = {
    ...props.data,
    createdAt: Date.now(),
    mergeChoiceId: props.state.history.length
  }
  props.state.history.unshift(newHistoryEvent)
  return props.state
}
