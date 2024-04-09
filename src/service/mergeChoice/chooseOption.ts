import applyChoice from './applyChoice'
import getItem from './getItem'
import getPoints from './getPoints'
import { Item, State, HistoryEvent, Calculated } from './mergeChoiceTypes'

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
  const aItem = getItem({ itemId: aId, items: props.state.items })
  const bItem = getItem({ itemId: bId, items: props.state.items })
  const newState = applyChoice({
    aBetter,
    aItem,
    betterIndex: props.betterIndex,
    bItem,
    state: props.state
  })
  const newAPoints = getPoints({ itemId: aItem.mergeChoiceId, state: newState })
  const calculatedA: Calculated<ListItem> = {
    ...aItem,
    points: newAPoints
  }
  const newBPoints = getPoints({ itemId: bItem.mergeChoiceId, state: newState })
  const calculatedB: Calculated<ListItem> = {
    ...bItem,
    points: newBPoints
  }
  const { history, ...previousState } = oldState
  void history
  const newHistoryEvent: HistoryEvent<ListItem> = {
    choice: {
      aBetter,
      aId: aItem.mergeChoiceId,
      aItem: calculatedA,
      bId: bItem.mergeChoiceId,
      bItem: calculatedB,
      random: oldState.choice.random
    },
    createdAt: Date.now(),
    mergeChoiceId: newState.history.length,
    previousState
  }
  newState.history = [newHistoryEvent, ...newState.history]
  return newState
}
