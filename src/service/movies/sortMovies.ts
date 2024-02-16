import { CalculatedMovie, Movie } from '../../types'
import getItem from '../mergeChoice/getItem'
import getPoints from '../mergeChoice/getPoints'
import { ItemId, State } from '../mergeChoice/merge-choice-types'
import compareMovies from './compareMovies'

export default function sortMovies (props: {
  ids: ItemId[]
  state: State<Movie>
  worseFirst?: boolean
}): CalculatedMovie[] {
  const calculatedMovies = props.ids.map((id) => {
    const movie = getItem({ id, items: props.state.items })
    const points = getPoints({ itemId: id, state: props.state })
    return {
      ...movie,
      points
    }
  })
  calculatedMovies.sort((a, b) => {
    return compareMovies({
      a,
      b,
      worseFirst: props.worseFirst
    })
  })
  return calculatedMovies
}
