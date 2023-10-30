import { CalculatedMovie, Movie } from '../../types'
import getPoints from '../mergeChoice/getPoints'
import { State } from '../mergeChoice/types'
import compareMovies from './compareMovies'

export default function sortMovies ({
  movies,
  state,
  worseFirst = false
}: {
  movies: Movie[]
  state: State<Movie>
  worseFirst?: boolean
}): CalculatedMovie[] {
  const calculatedMovies = movies.map((movie) => {
    const points = getPoints({ item: movie, state })
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
