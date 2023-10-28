import { STATE } from '../../constants'
import { Movie, State } from '../../types'
import clone from './clone'
import createChoice from './createChoice'
import getOperationsSteps from './getOperationsSteps'
import getOperations from './getOperations'

export default function populate ({ items, state }: {
  items: Movie[]
  state: State
}): State {
  const newItems = items.filter(movie => {
    const active = state.activeItems.some(item => item.id === movie.id)
    if (active) {
      return false
    }
    const better = state.betterItems.some(item => item.id === movie.id)
    if (better) {
      return false
    }
    const worse = state.worseItems.some(item => item.id === movie.id)
    if (worse) {
      return false
    }
    return true
  })
  if (state.finalized || (state.betterItems.length === 0 && state.worseItems.length === 0 && state.choice?.random !== true)) {
    const newState = clone(STATE)
    newState.history = state.history
    newState.activeItems = newItems
    newState.activeOperations = newState.activeItems.map(item => ({
      input: [[], []],
      output: [item.id]
    }))
    newState.activeItems.push(...state.activeItems)
    newState.activeOperations = getOperations(newState)
    newState.activeOperations.push(...state.activeOperations)
    const maxSteps = getOperationsSteps({ operations: newState.activeOperations })
    if (maxSteps === 0) {
      newState.finalized = true
      return newState
    }
    newState.choice = createChoice(newState)
    return newState
  }
  const newState = clone(state)
  newState.reserveItems.push(...newItems)
  return newState
}
