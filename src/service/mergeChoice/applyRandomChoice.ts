import arrayToDictionary from './arrayToDictionary'
import createActiveChoice from './createActiveChoice'
import createOperation from './createOperation'
import getOperations from './getOperations'
import getPoints from './getPoints'
import { Item, State } from './merge-choice-types'

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
    const newOperation = createOperation({ output })
    const newOperations = { [newOperation.mergeChoiceId]: newOperation }
    return {
      ...props.state,
      activeOperations: newOperations,
      complete: true
    }
  }
  activeIds.push(chosenItem.id)
  activeIds.unshift(unchosenItem.id)
  const completedOperationArray = activeIds.map(id => {
    const operation = createOperation({ output: [id] })
    return operation
  })
  const completedOperations = arrayToDictionary({ array: completedOperationArray })
  const betterOperation = createOperation({
    output: betterIds
  })
  const betterOperations = { [betterOperation.mergeChoiceId]: betterOperation }
  const worseOperation = createOperation({
    output: worseIds
  })
  const worseOperations = { [worseOperation.mergeChoiceId]: worseOperation }
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
  newState.activeOperations = getOperations({
    activeOperations: newState.activeOperations
  })
  newState.choice = createActiveChoice({
    activeOperations: newState.activeOperations
  })
  return newState
}
