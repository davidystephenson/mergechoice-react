import deduceState from './deduceState'
import { ItemId, Item, State } from './mergeChoiceTypes'

export default function rewindState <ListItem extends Item> (props: {
  historyEventId: ItemId
  state: State<ListItem>
}): State<ListItem> {
  const index = props.state.history.findIndex(
    event => event.mergeChoiceId === props.historyEventId
  )
  if (index === -1) {
    throw new Error('There is no event')
  }
  const events = props.state.history.slice(index + 1)
  const newState = deduceState({
    history: events,
    seed: props.state.seed
  })
  return newState
}
