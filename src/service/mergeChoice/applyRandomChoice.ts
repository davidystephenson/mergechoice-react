import arrayToDictionary from './arrayToDictionary'
import createActiveChoice from './createActiveChoice'
import getOperations from './getOperations'
import getPoints from './getPoints'
import { Item, State, CreateOperation, CreateChoice } from './merge-choice-types'

export default async function applyRandomChoice <ListItem extends Item> (props: {
  aBetter: boolean
  aItem: ListItem
  aPoints: number
  bItem: ListItem
  bPoints: number
  createChoice: CreateChoice
  createOperation: CreateOperation
  state: State<ListItem>
}): Promise<State<ListItem>> {
  const chosenItem = props.aBetter ? props.aItem : props.bItem
  const unchosenItem = props.aBetter ? props.bItem : props.aItem
  const chosenPoints = props.aBetter ? props.aPoints : props.bPoints
  const unchosenPoints = props.aBetter ? props.bPoints : props.aPoints
  const consistent = chosenPoints > unchosenPoints
  if (consistent) {
    return { ...props.state, complete: true }
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
    const newOperations = { [newOperation.id]: newOperation }
    return {
      ...props.state,
      activeOperations: newOperations,
      complete: true
    }
  }
  activeIds.push(chosenItem.id)
  activeIds.unshift(unchosenItem.id)
  const completedOperationPromises = activeIds.map(async id => {
    const operation = await props.createOperation({ output: [id] })
    return operation
  })
  const completedOperationArray = await Promise.all(completedOperationPromises)
  const completedOperations = arrayToDictionary({ array: completedOperationArray })
  const betterOperation = await props.createOperation({
    output: betterIds
  })
  const betterOperations = { [betterOperation.id]: betterOperation }
  const worseOperation = await props.createOperation({
    output: worseIds
  })
  const worseOperations = { [worseOperation.id]: worseOperation }
  const newState: State<ListItem> = {
    ...props.state,
    betterIds,
    worseIds,
    activeIds,
    activeOperations: completedOperations,
    betterOperations,
    worseOperations,
    complete: false
  }
  newState.activeOperations = await getOperations({
    activeOperations: newState.activeOperations,
    createOperation: props.createOperation
  })
  newState.choice = await createActiveChoice({
    activeOperations: newState.activeOperations,
    createChoice: props.createChoice
  })
  return newState
}
