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
  const shuffled = getShuffled(items)
  const { history, ...previousState } = state
  void history
  const population = populate({
    items: shuffled,
    state
  })
  const calculated = population.items.map(item => {
    return {
      ...item,
      points: 0
    }
  })
  const historyEvent: HistoryEvent<ListItem> = {
    createdAt: Date.now(),
    id: yeast(),
    import: {
      items: calculated
    },
    previousState
  }
  population.state.history.unshift(historyEvent)
  return population.state
}
