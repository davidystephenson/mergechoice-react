import importItems from './importItems'
import { HistoryEvent, Item, State } from './mergeChoiceTypes'

export default function restoreImport<ListItem extends Item> (props: {
  event: HistoryEvent<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  if (props.event.import == null) {
    throw new Error('There is no import')
  }
  const importedState = importItems({
    items: props.event.import.items,
    state: props.state
  })
  return importedState
}
