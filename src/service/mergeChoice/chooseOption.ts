import applyChoice from './applyChoice'
import asyncCreateYeastOperation from './asyncCreateYeastOperation'
import asyncCreateYeastChoice from './asyncCreateYeastChoice'
import getItem from './getItem'
import getPoints from './getPoints'
import { Item, State, HistoryEvent, Calculated, CreateOperation, CreateChoice } from './merge-choice-types'

export default async function chooseOption <ListItem extends Item> (props: {
  betterIndex: number
  createChoice?: CreateChoice
  createOperation?: CreateOperation
  state: State<ListItem>
}): Promise<State<ListItem>> {
  const createChoice = props.createChoice ?? asyncCreateYeastChoice
  const createOperation = props.createOperation ?? asyncCreateYeastOperation
  if (props.state.choice == null) {
    throw new Error('There is no choice.')
  }
  const oldState = JSON.parse(JSON.stringify(props.state))
  const aId = props.state.choice.options[props.state.choice.aIndex]
  const bId = props.state.choice.options[props.state.choice.bIndex]
  const aBetter = props.betterIndex === props.state.choice.aIndex
  const aItem = getItem({ id: aId, items: props.state.items })
  const bItem = getItem({ id: bId, items: props.state.items })
  const newState = await applyChoice({
    aBetter,
    aItem,
    betterIndex: props.betterIndex,
    bItem,
    createChoice,
    createOperation,
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
