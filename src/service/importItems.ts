import yeast from 'yeast'
import { HistoryEvent, Movie, State } from '../types'
import clone from './clone'
import populate from './populate'

export default function importItems ({
  items,
  state
}: {
  items: Movie[]
  state: State
}): State {
  const previousState = clone(state)
  const populatedState = populate({
    items,
    state
  })
  const historyEvent: HistoryEvent = {
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
