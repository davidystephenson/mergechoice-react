import arrayToDictionary from './arrayToDictionary'
import createActiveChoice from './createActiveChoice'
import createOperation from './createOperation'
import getOperations from './getOperations'
import getPoints from './getPoints'
import { Item, State } from './mergeChoiceTypes'

export default function applyRandomChoice <ListItem extends Item> (props: {
  aBetter: boolean
  aItem: ListItem
  aPoints: number
  bItem: ListItem
  bPoints: number
  state: State<ListItem>
}): State<ListItem> {
  const chosenItem = props.aBetter ? props.aItem : props.bItem
  const unchosenItem = props.aBetter ? props.bItem : props.aItem
  const chosenPoints = props.aBetter ? props.aPoints : props.bPoints
  const unchosenPoints = props.aBetter ? props.bPoints : props.aPoints
  const consistent = chosenPoints > unchosenPoints
  if (consistent) {
    return { ...props.state, complete: true }
  }
  const newState = { ...props.state }
  // TODO single reduce
  newState.betterIds = props.state.activeIds.filter(id => {
    const points = getPoints({ itemId: id, state: props.state })
    return points > unchosenPoints
  })
  newState.worseIds = props.state.activeIds.filter(id => {
    const points = getPoints({ itemId: id, state: props.state })
    return points < chosenPoints
  })
  newState.activeIds = props.state.activeIds.filter(id => {
    const points = getPoints({ itemId: id, state: props.state })
    return chosenPoints < points && points < unchosenPoints
  })
  const pairedChoice = newState.activeIds.length === 0
  if (pairedChoice) {
    newState.worseIds.push(unchosenItem.mergeChoiceId)
    newState.betterIds.unshift(chosenItem.mergeChoiceId)
    const output = [...newState.worseIds, ...newState.betterIds]
    const newOperation = createOperation({ output, state: newState })
    const newOperations = { [newOperation.mergeChoiceId]: newOperation }
    return {
      ...props.state,
      activeOperations: newOperations,
      complete: true
    }
  }
  newState.activeIds.push(chosenItem.mergeChoiceId)
  newState.activeIds.unshift(unchosenItem.mergeChoiceId)
  const completedOperationArray = newState.activeIds.map(id => {
    const operation = createOperation({ output: [id], state: newState })
    return operation
  })
  newState.activeOperations = arrayToDictionary({ array: completedOperationArray })
  const betterOperation = createOperation({
    output: newState.betterIds,
    state: newState
  })
  newState.betterOperations = { [betterOperation.mergeChoiceId]: betterOperation }
  const worseOperation = createOperation({
    output: newState.worseIds,
    state: newState
  })
  newState.worseOperations = { [worseOperation.mergeChoiceId]: worseOperation }
  newState.complete = false
  newState.activeOperations = getOperations({
    activeOperations: newState.activeOperations,
    state: newState
  })
  newState.choice = createActiveChoice({
    state: newState
  })
  return newState
}
