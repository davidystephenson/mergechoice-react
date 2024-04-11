import applyChoice from './applyChoice'
import getItem from './getItem'
import getOperation from './getOperation'
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
  const choiceSetup = applyChoice({
    aBetter,
    aItem,
    betterIndex: props.betterIndex,
    bItem,
    state: props.state
  })
  const newAPoints = getPoints({ itemId: aItem.id, state: choiceSetup.state })
  const calculatedA: Calculated<ListItem> = {
    ...aItem,
    points: newAPoints
  }
  const newBPoints = getPoints({ itemId: bItem.id, state: choiceSetup.state })
  const calculatedB: Calculated<ListItem> = {
    ...bItem,
    points: newBPoints
  }
  const { history, ...previousState } = oldState
  void history
  console.log('oldState', oldState)
  console.log('props.betterIndex', props.betterIndex)
  const worseIndex = 1 - props.betterIndex
  const choiceOperation = getOperation({
    operations: oldState.activeOperations,
    itemId: oldState.choice.operationMergeChoiceId
  })
  const newFirstOutput = choiceOperation.output.length > 0
    ? choiceOperation.output[0]
    : choiceOperation.input[worseIndex][0]
  const newHistoryEvent: HistoryEvent<ListItem> = {
    choice: {
      aBetter,
      aId: aItem.id,
      aItem: calculatedA,
      bId: bItem.id,
      bItem: calculatedB,
      fresh: choiceSetup.fresh,
      newFirstOutput,
      operationId: oldState.choice.operationMergeChoiceId,
      random: oldState.choice.random,
      worseIndex
    },
    createdAt: Date.now(),
    mergeChoiceId: choiceSetup.state.history.length,
    previousState
  }
  choiceSetup.state.history = [newHistoryEvent, ...choiceSetup.state.history]
  return choiceSetup.state
}
