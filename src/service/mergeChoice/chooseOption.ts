import applyChoice from './applyChoice'
import getItem from './getItem'
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
  const oldState = JSON.parse(JSON.stringify(state))
  const aId = state.choice.options[state.choice.aIndex]
  const bId = state.choice.options[state.choice.bIndex]
  const aBetter = betterIndex === state.choice.aIndex
  const aItem = getItem({ id: aId, items: state.items })
  const bItem = getItem({ id: bId, items: state.items })
  const newState = applyChoice({
    aBetter,
    aItem,
    betterIndex,
    bItem,
    state
  })
  console.log('newState', newState)
  const newAPoints = getPoints({ debug: true, itemId: aItem.id, state: newState })
  const calculatedA: Calculated<ListItem> = {
    ...aItem,
    points: newAPoints
  }
  const newBPoints = getPoints({ itemId: bItem.id, state: newState })
  const calculatedB: Calculated<ListItem> = {
    ...bItem,
    points: newBPoints
  }
  const { history, ...previousState } = oldState
  void history
  const newHistoryEvent: HistoryEvent<ListItem> = {
    choice: {
      aBetter,
      aId: aItem.id,
      aItem: calculatedA,
      bId: bItem.id,
      bItem: calculatedB,
      random: oldState.choice.random
    },
    createdAt: Date.now(),
    id: Math.random().toString(),
    previousState
  }
  newState.history = [newHistoryEvent, ...newState.history]
  return newState
}
