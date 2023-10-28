import { Movie } from '../../types'
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
}): void {
  const operatedMovies = movies.map((movie) => {
    const points = getPoints({ item: movie, state })
    return {
      ...movie,
      points
    }
  })
  operatedMovies.sort((a, b) => {
    return compareMovies({
      a,
      b,
      worseFirst
    })
  })
}
