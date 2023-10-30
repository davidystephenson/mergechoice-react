import { CalculatedMovie, Movie } from '../../types'
import { State } from '../mergeChoice/types'
import sortMovies from './sortMovies'

export default function getSortedMovies ({
  state
}: {
  state: State<Movie>
}): CalculatedMovie[] {
  const better = sortMovies({ movies: state.betterItems, state })
  const active = sortMovies({ movies: state.activeItems, state })
  const worse = sortMovies({ movies: state.worseItems, state })
  const reserve = sortMovies({ movies: state.reserveItems, state })
  return [
    ...better,
    ...active,
    ...worse,
    ...reserve
  ]
}
