import { HistoryEvent, State } from '../types'
import applyChoice from './applyChoice'
import findById from './findById'
import getPoints from './getPoints'

export default function chooseOption ({
  state,
  betterIndex
}: {
  state: State
  betterIndex: number
}): State {
  if (state.choice == null) {
    throw new Error('There is no choice.')
  }
  const aId = state.choice.options[state.choice.aIndex]
  const bId = state.choice.options[state.choice.bIndex]
  const aBetter = betterIndex === state.choice.aIndex
  const aItem = findById({ items: state.activeItems, id: aId })
  const bItem = findById({ items: state.activeItems, id: bId })
  const newState = applyChoice({
    aBetter,
    aItem,
    betterIndex,
    bItem,
    state
  })
  const newAPoints = getPoints({ item: aItem, state: newState })
  const aRecord = {
    ...aItem,
    points: newAPoints
  }
  const newBPoints = getPoints({ item: bItem, state: newState })
  const bRecord = {
    ...bItem,
    points: newBPoints
  }
  const newHistoryEvent: HistoryEvent = {
    choice: {
      aBetter,
      aId: aItem.id,
      aItem: aRecord,
      bId: bItem.id,
      bItem: bRecord,
      random: state.choice.random
    },
    createdAt: Date.now(),
    id: Math.random().toString(),
    previousState: state
  }
  newState.history = [newHistoryEvent, ...newState.history]
  return newState
}
