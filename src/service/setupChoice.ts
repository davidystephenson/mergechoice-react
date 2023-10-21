import { Movie, Operation, State } from '../types'
import createChoice from './createChoice'
import getOperations from './getOperations'
import populate from './populate'
import sortItems from './sortItems'

export default function setupChoice ({
  betterItems,
  activeItems,
  betterOperations,
  operations,
  reserveItems,
  worseItems,
  worseOperations
}: {
  betterItems: Movie[]
  activeItems: Movie[]
  betterOperations: Operation[]
  operations: Operation[]
  reserveItems: Movie[]
  worseItems: Movie[]
  worseOperations: Operation[]
}): State {
  const maxSteps = Math.max(...operations.map(operation => operation.steps))
  if (maxSteps > 0) {
    const newChoice = createChoice({
      operations
    })
    return {
      activeItems,
      reserveItems,
      betterItems,
      worseItems,
      operations,
      betterOperations,
      choice: newChoice,
      finalized: false,
      worseOperations
    }
  } else {
    const newOperations = getOperations({ operations })
    const maxSteps = Math.max(...newOperations.map(operation => operation.steps))
    if (maxSteps > 0) {
      const nextChoice = createChoice({
        operations: newOperations
      })
      return {
        activeItems,
        reserveItems,
        betterItems,
        worseItems,
        operations: newOperations,
        betterOperations,
        choice: nextChoice,
        finalized: false,
        worseOperations
      }
    } else {
      sortItems({
        activeItems,
        betterItems,
        betterOperations,
        items: worseItems,
        operations,
        reserveItems,
        worseFirst: true,
        worseItems,
        worseOperations
      })
      sortItems({
        activeItems,
        betterItems,
        betterOperations,
        items: activeItems,
        operations,
        reserveItems,
        worseFirst: true,
        worseItems,
        worseOperations
      })
      console.log('activeItems', activeItems)
      sortItems({
        activeItems,
        betterItems,
        betterOperations,
        items: betterItems,
        operations,
        reserveItems,
        worseFirst: true,
        worseItems,
        worseOperations
      })
      const combinedItems = [...worseItems, ...activeItems, ...betterItems]
      console.log('combinedItems', combinedItems)
      const combinedOperations = [{
        input: [[], []],
        output: combinedItems.map(item => item.id),
        steps: 0
      }]
      const oldState: State = {
        activeItems: combinedItems,
        reserveItems,
        betterItems: [],
        worseItems: [],
        operations: combinedOperations,
        betterOperations,
        choice: undefined,
        finalized: false,
        worseOperations
      }
      const newState = populate({ items: reserveItems, state: oldState })
      return newState
    }
  }
}
