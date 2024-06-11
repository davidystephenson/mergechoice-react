import createState from './createState'
import { HistoryEvent, Item, State } from './mergeChoiceTypes'
import restoreEvent from './restoreEvent'

export default function deduceState<ListItem extends Item> (props: {
  history: Array<HistoryEvent<ListItem>>
  seed: string
}): State<ListItem> {
  const initial = createState<ListItem>({ seed: props.seed })
  const reversed = props.history.slice().reverse()
  const deduced = reversed.reduce<State<ListItem>>((state, event) => {
    const restoredState = restoreEvent({ event, state })
    const lastEvent = restoredState.history[0]
    lastEvent.createdAt = event.createdAt
    return restoredState
  }, initial)
  return deduced
}
