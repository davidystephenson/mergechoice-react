import { Movie } from '../../types'
import { State } from '../mergeChoice/types'
import sortMovies from './sortMovies'

export default function getSortedMovies ({
  state
}: {
  state: State<Movie>
}): Movie[] {
  sortMovies({ movies: state.betterItems, state })
  sortMovies({ movies: state.activeItems, state })
  sortMovies({ movies: state.worseItems, state })
  sortMovies({ movies: state.reserveItems, state })
  return [
    ...state.betterItems,
    ...state.activeItems,
    ...state.worseItems,
    ...state.reserveItems
  ]
}
