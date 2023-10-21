import { STATE } from '../constants'
import { Movie, State } from '../types'
import clone from './clone'
import createChoice from './createChoice'
import getOperations from './getOperations'
import logOperations from './logOperation'

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
  if (state.betterItems.length === 0 && state.worseItems.length === 0) {
    const newState = clone(STATE)
    console.log('newItems', newItems)
    newState.activeItems = newItems
    console.log('newState.activeItems', newState.activeItems)
    newState.operations = newState.activeItems.map(item => ({
      input: [[], []],
      output: [item.id],
      steps: 0
    }))
    logOperations({
      label: 'newState.operations new',
      items: newState.activeItems,
      operations: newState.operations
    })
    newState.activeItems.push(...state.activeItems)
    newState.operations = getOperations(newState)
    newState.operations.push(...state.operations)
    logOperations({
      label: 'newState.operations final',
      items: newState.activeItems,
      operations: newState.operations
    })
    const maxSteps = Math.max(...newState.operations.map(operation => operation.steps))
    if (maxSteps === 0) {
      newState.finalized = true
      return newState
    }
    newState.choice = createChoice(newState)
    console.log('newState.choice', newState.choice)
    return newState
  }
  const newState = clone(state)
  console.log('else state', clone(newState))
  newState.reserveItems.push(...newItems)
  console.log('final newState', clone(newState))
  return newState
}
