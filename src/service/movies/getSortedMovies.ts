import { CalculatedMovie, Movie } from '../../types'
import { State } from '../mergeChoice/mergeChoiceTypes'
import sortMovies from './sortMovies'

export default function getSortedMovies (props: {
  state: State<Movie>
}): CalculatedMovie[] {
  const better = sortMovies({ itemIds: props.state.betterIds, state: props.state })
  const active = sortMovies({ itemIds: props.state.activeIds, state: props.state })
  const worse = sortMovies({ itemIds: props.state.worseIds, state: props.state })
  const reserve = sortMovies({ itemIds: props.state.reserveIds, state: props.state })
  return [
    ...better,
    ...active,
    ...worse,
    ...reserve
  ]
}
