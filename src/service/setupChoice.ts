import { Movie, Operation, State } from '../types'
import createChoice from './createChoice'
import getOperations from './getOperations'
import populate from './populate'

export default function setupChoice ({
  betterItems,
  items,
  oldOperations,
  operations,
  populatingItems,
  worseItems
}: {
  betterItems: Movie[]
  items: Movie[]
  oldOperations: Operation[]
  operations: Operation[]
  populatingItems: Movie[]
  worseItems: Movie[]
}): State {
  const maxSteps = Math.max(...operations.map(operation => operation.steps))
  if (maxSteps > 0) {
    const newChoice = createChoice({
      operations
    })
    return {
      items,
      populatingItems,
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
        populatingItems,
        betterItems,
        worseItems,
        operations: newOperations,
        oldOperations,
        choice: nextChoice,
        finalized: false
      }
    } else {
      const combinedItems = [...worseItems, ...items, ...betterItems]
      const combinedOperations = [{
        input: [[], []],
        output: combinedItems.map(item => item.id),
        steps: 0
      }]
      const oldState: State = {
        items: combinedItems,
        populatingItems,
        betterItems: [],
        worseItems: [],
        operations: combinedOperations,
        oldOperations,
        choice: undefined,
        finalized: true
      }
      const newState = populate({ movies: populatingItems, state: oldState })
      return newState
    }
  }
}
