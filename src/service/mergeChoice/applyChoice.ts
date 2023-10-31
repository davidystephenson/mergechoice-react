import getPoints from './getPoints'
import setupChoice from './setupChoice'
import applyRandomChoice from './applyRandomChoice'
import { Item, State } from './types'
import getItem from './getItem'

export default function applyChoice <ListItem extends Item> ({
  aBetter,
  aItem,
  betterIndex,
  bItem,
  state
}: {
  aBetter: boolean
  aItem: ListItem
  betterIndex: number
  bItem: ListItem
  state: State<ListItem>
}): State<ListItem> {
  if (state.choice == null) {
    throw new Error('There is no choice.')
  }
  const aPoints = getPoints({ itemId: aItem.id, state })
  const bPoints = getPoints({ itemId: bItem.id, state })
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
  const currentOperation = state.activeOperations[state.choice.currentOperationIndex]
  const betterInput = currentOperation.input[betterIndex]
  const worseIndex = 1 - betterIndex
  const worseInput = currentOperation.input[worseIndex]
  const worseId = worseInput.shift()
  if (worseId == null) {
    throw new Error('worseId is null')
  }
  const worseItem = getItem({ id: worseId, items: state.items })
  worseItem.updatedAt = Date.now()
  currentOperation.output.push(worseId)
  if (worseInput.length === 0) {
    currentOperation.output.push(...betterInput)
    currentOperation.input[betterIndex] = []
  }
  return setupChoice(state)
}
