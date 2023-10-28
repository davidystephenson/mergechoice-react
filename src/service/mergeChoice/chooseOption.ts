import applyChoice from './applyChoice'
import findById from './findById'
import getPoints from './getPoints'
import { Item, State, HistoryEvent, Calculated } from './types'

export default function chooseOption <ListItem extends Item> ({
  state,
  betterIndex
}: {
  state: State<ListItem>
  betterIndex: number
}): State<ListItem> {
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
  const calculatedA: Calculated<ListItem> = {
    ...aItem,
    points: newAPoints
  }
  const newBPoints = getPoints({ item: bItem, state: newState })
  const calculatedB: Calculated<ListItem> = {
    ...bItem,
    points: newBPoints
  }
  const newHistoryEvent: HistoryEvent<ListItem> = {
    choice: {
      aBetter,
      aId: aItem.id,
      aItem: calculatedA,
      bId: bItem.id,
      bItem: calculatedB,
      random: state.choice.random
    },
    createdAt: Date.now(),
    id: Math.random().toString()
    // previousState: state
  }
  newState.history = [newHistoryEvent, ...newState.history]
  return newState
}
