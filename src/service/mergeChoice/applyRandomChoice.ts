import createChoice from './createChoice'
import getOperations from './getOperations'
import getPoints from './getPoints'
import { Item, State, Operation } from './types'

export default function applyRandomChoice <ListItem extends Item> ({
  aBetter,
  aItem,
  aPoints,
  bItem,
  bPoints,
  state
}: {
  aBetter: boolean
  aItem: ListItem
  aPoints: number
  bItem: ListItem
  bPoints: number
  state: State<ListItem>
}): State<ListItem> {
  const chosenItem = aBetter ? aItem : bItem
  const unchosenItem = aBetter ? bItem : aItem
  const chosenPoints = aBetter ? aPoints : bPoints
  const unchosenPoints = aBetter ? bPoints : aPoints
  const consistent = chosenPoints > unchosenPoints
  if (consistent) {
    return { ...state, finalized: true }
  }
  // TODO single reduce
  const betterIds = state.activeIds.filter(id => {
    const points = getPoints({ itemId: id, state })
    return points > unchosenPoints
  })
  const worseIds = state.activeIds.filter(id => {
    const points = getPoints({ itemId: id, state })
    return points < chosenPoints
  })
  const activeIds = state.activeIds.filter(id => {
    const points = getPoints({ itemId: id, state })
    return chosenPoints < points && points < unchosenPoints
  })
  const pairedChoice = activeIds.length === 0
  if (pairedChoice) {
    worseIds.push(unchosenItem.id)
    betterIds.unshift(chosenItem.id)
    const newOperation: Operation = {
      input: [[], []],
      output: [...worseIds, ...betterIds]
    }
    return {
      ...state,
      activeOperations: [newOperation],
      finalized: true
    }
  }
  activeIds.push(chosenItem.id)
  activeIds.unshift(unchosenItem.id)
  const completedOperations = activeIds.map(id => ({
    input: [[], []],
    output: [id]
  }))
  const betterOperation = {
    input: [[], []],
    output: betterIds
  }
  const worseOperation = {
    input: [[], []],
    output: worseIds
  }
  const newState: State<ListItem> = {
    ...state,
    betterIds,
    worseIds,
    activeIds,
    activeOperations: completedOperations,
    betterOperations: [betterOperation],
    worseOperations: [worseOperation],
    finalized: false
  }
  newState.activeOperations = getOperations(newState)
  newState.choice = createChoice(newState)
  return newState
}
