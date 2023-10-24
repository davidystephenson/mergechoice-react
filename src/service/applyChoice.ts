import { Movie, State } from '../types'
import clone from './clone'
import findById from './findById'
import getPoints from './getPoints'
import setupChoice from './setupChoice'
import applyRandomChoice from './applyRandomChoice'

export default function applyChoice ({
  aBetter,
  aItem,
  betterIndex,
  bItem,
  state
}: {
  aBetter: boolean
  aItem: Movie
  betterIndex: number
  bItem: Movie
  state: State
}): State {
  if (state.choice == null) {
    throw new Error('There is no choice.')
  }
  const aPoints = getPoints({ item: aItem, state })
  const bPoints = getPoints({ item: bItem, state })
  if (state.choice.random) {
    return applyRandomChoice({
      aBetter,
      aItem,
      aPoints,
      bItem,
      bPoints,
      state
    })
  }
  const newState = clone(state)
  const currentOperation = newState.activeOperations[state.choice.currentOperationIndex]
  const betterInput = currentOperation.input[betterIndex]
  const worseIndex = 1 - betterIndex
  const worseInput = currentOperation.input[worseIndex]
  const worseId = worseInput.shift()
  if (worseId == null) {
    throw new Error('worseId is null')
  }
  const worseItem = findById({ items: newState.activeItems, id: worseId })
  worseItem.updatedAt = Date.now()
  currentOperation.output.push(worseId)
  currentOperation.steps -= 1
  if (worseInput.length === 0) {
    currentOperation.output.push(...betterInput)
    currentOperation.input[betterIndex] = []
    currentOperation.steps = 0
  }
  return setupChoice(newState)
}
