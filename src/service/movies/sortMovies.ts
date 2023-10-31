import { CalculatedMovie, Movie } from '../../types'
import getItem from '../mergeChoice/getItem'
import getPoints from '../mergeChoice/getPoints'
import { State } from '../mergeChoice/types'
import compareMovies from './compareMovies'

export default function sortMovies ({
  ids,
  state,
  worseFirst = false
}: {
  ids: string[]
  state: State<Movie>
  worseFirst?: boolean
}): CalculatedMovie[] {
  const calculatedMovies = ids.map((id) => {
    const movie = getItem({ id, items: state.items })
    const points = getPoints({ itemId: id, state })
    return {
      ...movie,
      points
    }
  })
  calculatedMovies.sort((a, b) => {
    return compareMovies({
      a,
      b,
      worseFirst
    })
  })
  return calculatedMovies
}
