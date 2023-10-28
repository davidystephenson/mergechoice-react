import { Movie, SortedMovies } from '../../types'
import { State } from '../mergeChoice/types'
import sortMovies from './sortMovies'

export default function getSortedMovies ({
  state
}: {
  state: State<Movie>
}): SortedMovies {
  sortMovies({ movies: state.activeItems, state })
  sortMovies({ movies: state.betterItems, state })
  sortMovies({ movies: state.reserveItems, state })
  sortMovies({ movies: state.worseItems, state })
  const sortedItems = {
    active: state.activeItems,
    better: state.betterItems,
    reserve: state.reserveItems,
    worse: state.worseItems
  }
  return sortedItems
}
