import { STATE } from '../constants'
import { Movie, State } from '../types'
import clone from './clone'
import createChoice from './createChoice'
import getOperations from './getOperations'
import getShuffled from './getShuffled'

export default function populate ({ movies, state }: {
  movies: Movie[]
  state: State
}): State {
  const newMovies = movies.filter(movie => {
    return state.items.every(item => item.id !== movie.id)
  })
  const newState = clone(STATE)
  const newItems = getShuffled(newMovies)
  const betterItems = state.betterItems
  const worseItems = state.worseItems
  if (betterItems.length === 0 && worseItems.length === 0) {
    console.log('newItems', newItems)
    newState.items = newItems
    console.log('initialState.items', newState.items)
    newState.operations = newState.items.map(item => ({
      input: [[], []],
      output: [item.id],
      steps: 0
    }))
    newState.operations = getOperations(newState)
    newState.choice = createChoice(newState)
    newState.operations.push(...state.operations)
    newState.items.push(...state.items)
    return newState
  }
  newState.populatingItems.push(...newItems)
  return newState
}
