import { State } from '../types'
import clone from './clone'
import createChoice from './createChoice'
import findById from './findById'
import getOperations from './getOperations'

export default function chooseOption ({
  state: {
    items,
    operations,
    choice
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
  const maxSteps = Math.max(...newOperations.map(operation => operation.steps))
  if (maxSteps > 0) {
    const newChoice = createChoice({
      operations: newOperations
    })
    return {
      items: newItems,
      operations: newOperations,
      choice: newChoice,
      finalized: false
    }
  } else {
    const nextOperations = getOperations({ operations: newOperations })
    const maxSteps = Math.max(...nextOperations.map(operation => operation.steps))
    if (maxSteps > 0) {
      const nextChoice = createChoice({
        operations: nextOperations
      })
      return {
        items: newItems,
        operations: nextOperations,
        choice: nextChoice,
        finalized: false
      }
    } else {
      return {
        items: newItems,
        operations: nextOperations,
        choice: undefined,
        finalized: true
      }
    }
  }
}
