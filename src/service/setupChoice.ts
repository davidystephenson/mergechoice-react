import { Movie, Operation, State } from '../types'
import createChoice from './createChoice'
import getOperations from './getOperations'
import populate from './populate'
import sortItems from './sortItems'

export default function setupChoice ({
  betterItems,
  activeItems,
  reserveOperations,
  operations,
  reserveItems,
  worseItems
}: {
  betterItems: Movie[]
  activeItems: Movie[]
  reserveOperations: Operation[]
  operations: Operation[]
  reserveItems: Movie[]
  worseItems: Movie[]
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
      reserveOperations,
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
        activeItems,
        reserveItems,
        betterItems,
        worseItems,
        operations: newOperations,
        reserveOperations,
        choice: nextChoice,
        finalized: false
      }
    } else {
      sortItems({
        items: worseItems,
        operations,
        worseFirst: true
      })
      sortItems({
        items: activeItems,
        operations,
        worseFirst: true
      })
      console.log('activeItems', activeItems)
      sortItems({
        items: betterItems,
        operations,
        worseFirst: true
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
        reserveOperations,
        choice: undefined,
        finalized: false
      }
      const newState = populate({ items: reserveItems, state: oldState })
      return newState
    }
  }
}
