import { CalculatedMovie, Movie } from '../../types'
import getItem from '../mergechoice/getItem'
import getPoints from '../mergechoice/getPoints'
import { ItemId, State } from '../mergechoice/mergeChoiceTypes'
import compareMovies from './compareMovies'

export default function sortMovies (props: {
  ids: ItemId[]
  state: State<Movie>
  worseFirst?: boolean
}): CalculatedMovie[] {
  const calculatedMovies = props.ids.map((itemId) => {
    const movie = getItem({ itemId, items: props.state.items })
    const points = getPoints({ itemId, state: props.state })
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
