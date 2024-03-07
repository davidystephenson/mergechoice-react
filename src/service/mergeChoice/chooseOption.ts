import applyChoice from './applyChoice'
import getItem from './getItem'
import getPoints from './getPoints'
import { Item, State, HistoryEvent, Calculated } from './merge-choice-types'

export default function chooseOption <ListItem extends Item> (props: {
  betterIndex: number
  state: State<ListItem>
}): State<ListItem> {
  if (props.state.choice == null) {
    throw new Error('There is no choice.')
  }
  const oldState = JSON.parse(JSON.stringify(props.state))
  const aId = props.state.choice.options[props.state.choice.aIndex]
  const bId = props.state.choice.options[props.state.choice.bIndex]
  const aBetter = props.betterIndex === props.state.choice.aIndex
  const aItem = getItem({ id: aId, items: props.state.items })
  const bItem = getItem({ id: bId, items: props.state.items })
  const newState = applyChoice({
    aBetter,
    aItem,
    betterIndex: props.betterIndex,
    bItem,
    state: props.state
  })
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
    mergeChoiceId: Math.random().toString(),
    previousState
  }
  newState.history = [newHistoryEvent, ...newState.history]
  return newState
}
