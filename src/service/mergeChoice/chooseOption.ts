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
  const appliedState = applyChoice({
    aBetter,
    aItem,
    betterIndex: props.betterIndex,
    bItem,
    state: props.state
  })
  const newAPoints = getPoints({ itemId: aItem.id, state: appliedState })
  const calculatedA: Calculated<ListItem> = {
    ...aItem,
    points: newAPoints
  }
  const newBPoints = getPoints({ itemId: bItem.id, state: appliedState })
  const calculatedB: Calculated<ListItem> = {
    ...bItem,
    points: newBPoints
  }
  void history
  const worseIndex = 1 - props.betterIndex
  const newHistoryEvent: HistoryEvent<ListItem> = {
    choice: {
      aBetter,
      aId: aItem.id,
      aItem: calculatedA,
      betterIndex: props.betterIndex,
      bId: bItem.id,
      bItem: calculatedB,
      operationId: oldState.choice.operationMergeChoiceId,
      random: oldState.choice.random,
      worseIndex
    },
    createdAt: Date.now(),
    mergeChoiceId: appliedState.history.length
  }
  appliedState.history = [newHistoryEvent, ...appliedState.history]
  return appliedState
}
