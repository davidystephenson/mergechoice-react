import { Movie, Operation, State } from '../types'
import createChoice from './createChoice'
import getOperations from './getOperations'

export default function setupChoice ({
  operations,
  items
}: {
  operations: Operation[]
  items: Movie[]
}): State {
  const maxSteps = Math.max(...operations.map(operation => operation.steps))
  if (maxSteps > 0) {
    const newChoice = createChoice({
      operations
    })
    return {
      items,
      operations,
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
        operations: newOperations,
        choice: nextChoice,
        finalized: false
      }
    } else {
      return {
        items,
        operations: newOperations,
        choice: undefined,
        finalized: true
      }
    }
  }
}
