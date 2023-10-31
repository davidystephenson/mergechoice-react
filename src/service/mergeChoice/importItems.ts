import yeast from 'yeast'
import populate from './populate'
import { Item, State, HistoryEvent } from './types'

export default function importItems <ListItem extends Item> ({
  items,
  state
}: {
  items: ListItem[]
  state: State<ListItem>
}): State<ListItem> {
  const { history, ...previousState } = state
  void history
  const populatedState = populate({
    items,
    state
  })
  const historyEvent: HistoryEvent<ListItem> = {
    createdAt: Date.now(),
    id: yeast(),
    import: {
      items
    },
    previousState
  }
  populatedState.history.unshift(historyEvent)
  return populatedState
}
