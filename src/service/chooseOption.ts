import { State } from '../types'
import clone from './clone'
import findById from './findById'
import setupChoice from './setupChoice'

export default function chooseOption ({
  state: {
    betterItems,
    choice,
    activeItems,
    betterOperations: reserveOperations,
    operations,
    reserveItems,
    worseItems,
    worseOperations
  },
  betterIndex
}: {
  state: State
  betterIndex: number
}): State {
  const newItems = clone(activeItems)
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
  currentOperation.output.push(worseId)
  currentOperation.steps -= 1
  if (worseInput.length === 0) {
    currentOperation.output.push(...betterInput)
    currentOperation.input[betterIndex] = []
    currentOperation.steps = 0
  }
  return setupChoice({
    betterItems,
    activeItems: newItems,
    betterOperations: reserveOperations,
    operations: newOperations,
    reserveItems,
    worseItems,
    worseOperations
  })
}
