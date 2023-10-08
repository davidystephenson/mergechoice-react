import { State } from "../types"
import clone from "./clone"
import cloneLog from "./clonelog"
import createChoice from "./createChoice"
import findById from "./findById"
import getOperations from "./getOperations"

export default function chooseOption({
  state: {
    items,
    operations,
    choice
  },
  optionIndex
}: {
  state: State
  optionIndex: number
}): State {
  const newItems = clone(items)
  const newOperations = clone(operations)
  cloneLog('newOperations', newOperations)
  if (choice == null) {
    throw new Error('choice is null')
  }
  const currentOperation = newOperations[choice.currentOperationIndex]
  cloneLog('currentOperation', currentOperation)
  const chosenId = currentOperation.input[optionIndex].shift()
  console.log('chosenId', chosenId)
  if (chosenId == null) {
    throw new Error('chosenId is null')
  }
  currentOperation.output.push(chosenId)
  const chosenItem = findById({ items: newItems, id: chosenId })
  console.log('chosenItem', chosenItem)
  chosenItem.points = currentOperation.steps
  currentOperation.steps -= 1
  if (currentOperation.input[optionIndex].length === 0) {
    currentOperation.output.push(...currentOperation.input[1 - optionIndex])
    currentOperation.input[1 - optionIndex] = []
    currentOperation.steps = 0
  }
  newItems.sort((a, b) => b.points - a.points)
  const maxSteps = Math.max(...newOperations.map(operation => operation.steps))
  if (maxSteps > 0) {
    const newChoice = createChoice({
      operations: newOperations, items: newItems
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
        operations: nextOperations,
        items: newItems
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
        choice,
        finalized: true
      }
    }
  }
}