import { SortedItems, State } from '../types'
import sortItems from './sortItems'

export default function getSortedItems ({
  state
}: {
  state: State
}): SortedItems {
  sortItems({ items: state.activeItems, state })
  sortItems({ items: state.betterItems, state })
  sortItems({ items: state.reserveItems, state })
  sortItems({ items: state.worseItems, state })
  const sortedItems = {
    active: state.activeItems,
    better: state.betterItems,
    reserve: state.reserveItems,
    worse: state.worseItems
  }
  return sortedItems
}
