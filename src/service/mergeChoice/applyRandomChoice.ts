import createChoice from './createChoice'
import getOperations from './getOperations'
import getPoints from './getPoints'
import { Item, State, CreateOperation } from './merge-choice-types'

export default async function applyRandomChoice <ListItem extends Item> (props: {
  aBetter: boolean
  aItem: ListItem
  aPoints: number
  bItem: ListItem
  bPoints: number
  createOperation: CreateOperation
  state: State<ListItem>
}): Promise<State<ListItem>> {
  const chosenItem = props.aBetter ? props.aItem : props.bItem
  const unchosenItem = props.aBetter ? props.bItem : props.aItem
  const chosenPoints = props.aBetter ? props.aPoints : props.bPoints
  const unchosenPoints = props.aBetter ? props.bPoints : props.aPoints
  const consistent = chosenPoints > unchosenPoints
  if (consistent) {
    return { ...props.state, finalized: true }
  }
  // TODO single reduce
  const betterIds = props.state.activeIds.filter(id => {
    const points = getPoints({ itemId: id, state: props.state })
    return points > unchosenPoints
  })
  const worseIds = props.state.activeIds.filter(id => {
    const points = getPoints({ itemId: id, state: props.state })
    return points < chosenPoints
  })
  const activeIds = props.state.activeIds.filter(id => {
    const points = getPoints({ itemId: id, state: props.state })
    return chosenPoints < points && points < unchosenPoints
  })
  const pairedChoice = activeIds.length === 0
  if (pairedChoice) {
    worseIds.push(unchosenItem.id)
    betterIds.unshift(chosenItem.id)
    const output = [...worseIds, ...betterIds]
    const newOperation = await props.createOperation({ output })
    return {
      ...props.state,
      activeOperations: [newOperation],
      finalized: true
    }
  }
  activeIds.push(chosenItem.id)
  activeIds.unshift(unchosenItem.id)
  const completedOperationPromises = activeIds.map(async id => {
    const operation = await props.createOperation({ output: [id] })
    return operation
  })
  const completedOperations = await Promise.all(completedOperationPromises)
  const betterOperation = await props.createOperation({
    output: betterIds
  })
  const worseOperation = await props.createOperation({
    output: worseIds
  })
  const newState: State<ListItem> = {
    ...props.state,
    betterIds,
    worseIds,
    activeIds,
    activeOperations: completedOperations,
    betterOperations: [betterOperation],
    worseOperations: [worseOperation],
    finalized: false
  }
  newState.activeOperations = await getOperations({
    activeOperations: newState.activeOperations,
    createOperation: props.createOperation
  })
  newState.choice = createChoice(newState)
  return newState
}
