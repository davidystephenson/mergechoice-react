import { CalculatedMovie, Movie } from '../../types'
import { State } from '../mergeChoice/types'
import sortMovies from './sortMovies'

export default function getSortedMovies ({
  state
}: {
  state: State<Movie>
}): CalculatedMovie[] {
  const better = sortMovies({ ids: state.betterIds, state })
  const active = sortMovies({ ids: state.activeIds, state })
  const worse = sortMovies({ ids: state.worseIds, state })
  const reserve = sortMovies({ ids: state.reserveIds, state })
  return [
    ...better,
    ...active,
    ...worse,
    ...reserve
  ]
}
