import { Movie, Operation, State } from '../types'
import createChoice from './createChoice'
import getOperations from './getOperations'

export default function setupChoice ({
  betterItems,
  items,
  oldOperations,
  operations,
  worseItems
}: {
  betterItems: Movie[]
  items: Movie[]
  oldOperations: Operation[]
  operations: Operation[]
  worseItems: Movie[]
}): State {
  const maxSteps = Math.max(...operations.map(operation => operation.steps))
  if (maxSteps > 0) {
    const newChoice = createChoice({
      operations
    })
    return {
      items,
      betterItems,
      worseItems,
      operations,
      oldOperations,
      choice: newChoice,
      finalized: false
    }
  } else {
    const newOperations = getOperations({ operations })
    const maxSteps = Math.max(...newOperations.map(operation => operation.steps))
    if (maxSteps > 0) {
      const nextChoice = createChoice({
        operations: newOperations
      })
      return {
        items,
        betterItems,
        worseItems,
        operations: newOperations,
        oldOperations,
        choice: nextChoice,
        finalized: false
      }
    } else {
      const combinedItems = [...worseItems, ...items, ...betterItems]
      const combinedOperation = {
        input: [[], []],
        output: combinedItems.map(item => item.id),
        steps: 0
      }
      return {
        items: combinedItems,
        betterItems: [],
        worseItems: [],
        operations: [combinedOperation],
        oldOperations,
        choice: undefined,
        finalized: true
      }
    }
  }
}
