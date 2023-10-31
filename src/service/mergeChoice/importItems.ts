import yeast from 'yeast'
import populate from './populate'
import { Item, State, HistoryEvent } from './types'
import getShuffled from './getShuffled'

export default function importItems <ListItem extends Item> ({
  items,
  state
}: {
  items: ListItem[]
  state: State<ListItem>
}): State<ListItem> {
  const shuffled = getShuffled(items).slice(0, 5)
  const { history, ...previousState } = state
  void history
  const populatedState = populate({
    items: shuffled,
    state
  })
  const historyEvent: HistoryEvent<ListItem> = {
    createdAt: Date.now(),
    id: yeast(),
    import: {
      items: shuffled
    },
    previousState
  }
  populatedState.history.unshift(historyEvent)
  return populatedState
}
