import { Item, State } from './types'

export default function rewindState <ListItem extends Item> ({
  historyEventId,
  state
}: {
  historyEventId: string
  state: State<ListItem>
}): State<ListItem> {
  const historyEvent = state.history.find(event => event.id === historyEventId)
  if (historyEvent == null) {
    const message = `There is no history event with id ${historyEventId}.`
    throw new Error(message)
  }
  if (historyEvent.previousState == null) {
    const message = `There is no previous state for history event with id ${historyEventId}.`
    throw new Error(message)
  }
  return historyEvent.previousState
}