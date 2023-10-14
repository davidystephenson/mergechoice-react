import { State } from '../types'
import clone from './clone'
import findById from './findById'
import setupChoice from './setupChoice'

export default function chooseOption ({
  state: {
    betterItems,
    choice,
    items,
    oldOperations,
    operations,
    populatingItems,
    worseItems
  },
  betterIndex
}: {
  state: State
  betterIndex: number
}): State {
  const newItems = clone(items)
  const newOperations = clone(operations)
  if (choice == null) {
    throw new Error('choice is null')
  }
  const currentOperation = newOperations[choice.currentOperationIndex]
  const betterInput = currentOperation.input[betterIndex]
  const worseIndex = 1 - betterIndex
  const worseInput = currentOperation.input[worseIndex]
  const worseId = worseInput.shift()
  if (worseId == null) {
    throw new Error('worseId is null')
  }
  const worseItem = findById({ items: newItems, id: worseId })
  worseItem.updatedAt = Date.now()
  betterInput.forEach(id => {
    const item = findById({ items: newItems, id })
    item.points += 1
  })
  currentOperation.output.push(worseId)
  currentOperation.steps -= 1
  if (worseInput.length === 0) {
    currentOperation.output.push(...betterInput)
    currentOperation.input[betterIndex] = []
    currentOperation.steps = 0
  }
  return setupChoice({
    betterItems,
    items: newItems,
    oldOperations,
    operations: newOperations,
    populatingItems,
    worseItems
  })
}
