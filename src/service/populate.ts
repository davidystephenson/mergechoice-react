import { Movie, State } from '../types'
import clone from './clone'
import initializeState from './initializeState'

export default function populate ({ movies, state }: {
  movies: Movie[]
  state: State
}): State {
  const newMovies = movies.filter(movie => {
    return state.items.every(item => item.id !== movie.id)
  })
  const newState = clone(state)
  const initializedState = initializeState({ items: newMovies })
  initializedState.operations.push(...newState.operations)
  initializedState.items.push(...newState.items)
  return initializedState
}
