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
  const importItems = getShuffled(newMovies).slice(0, 5)
  const betterItems: Movie[] = []
  const worseItems: Movie[] = []
  const newItems = importItems.slice(0, 5)
  worseItems.forEach((item, index) => { item.points = index })
  // newItems.forEach(item => { item.points = 2 })
  betterItems.forEach((item, index) => { item.points = 7 + index })
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
  newState.betterItems = betterItems
  newState.worseItems = worseItems
  newState.oldOperations = [
    {
      input: [[], []],
      output: [
        ...worseItems.map(item => item.id),
        ...betterItems.map(item => item.id)
      ],
      steps: 0
    }
  ]
  newState.operations.push(...state.operations)
  newState.items.push(...state.items)
  return newState
}
