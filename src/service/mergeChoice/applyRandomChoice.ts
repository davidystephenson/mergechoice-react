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
  const betterItems = state.activeItems.filter(item => {
    const points = getPoints({ item, state })
    return points > unchosenPoints
  })
  const worseItems = state.activeItems.filter(item => {
    const points = getPoints({ item, state })
    return points < chosenPoints
  })
  const activeItems = state.activeItems.filter(item => {
    const points = getPoints({ item, state })
    return chosenPoints < points && points < unchosenPoints
  })
  const pairedChoice = activeItems.length === 0
  if (pairedChoice) {
    worseItems.push(unchosenItem)
    betterItems.unshift(chosenItem)
    const worseIds = worseItems.map(item => item.id)
    const betterIds = betterItems.map(item => item.id)
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
  activeItems.push(chosenItem)
  activeItems.unshift(unchosenItem)
  const completedOperations = activeItems.map(item => ({
    input: [[], []],
    output: [item.id]
  }))
  const betterOperation = {
    input: [[], []],
    output: betterItems.map(item => item.id)
  }
  const worseOperation = {
    input: [[], []],
    output: worseItems.map(item => item.id)
  }
  const newState: State<ListItem> = {
    ...state,
    betterItems,
    worseItems,
    activeItems,
    activeOperations: completedOperations,
    betterOperations: [betterOperation],
    worseOperations: [worseOperation],
    finalized: false
  }
  newState.activeOperations = getOperations(newState)
  newState.choice = createChoice(newState)
  return newState
}