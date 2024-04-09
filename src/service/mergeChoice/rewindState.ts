import { Item, State } from './mergeChoiceTypes'

export default function rewindState <ListItem extends Item> ({
  historyEventId,
  state
}: {
  historyEventId: number
  state: State<ListItem>
}): State<ListItem> {
  const historyEvent = state.history.find(event => event.mergeChoiceId === historyEventId)
  if (historyEvent == null) {
    const message = `There is no history event with id ${historyEventId}.`
    throw new Error(message)
  }
  if (historyEvent.previousState == null) {
    const message = `There is no previous state for history event with id ${historyEventId}.`
    throw new Error(message)
  }
  const index = state.history.indexOf(historyEvent)
  const previousHistory = state.history.slice(index + 1)
  const newState = {
    ...historyEvent.previousState,
    history: previousHistory
  }
  return newState
}
