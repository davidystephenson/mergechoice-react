import MovieProvider from '../context/movie/MovieProvider'
import compareMovies from '../service/compareMovies'
import { Movie } from '../types'
import MovieRow from './MovieRow'

export default function MovieRows ({
  movies
}: {
  movies: Movie[]
}): JSX.Element {
  const sortedMovies = movies.sort(compareMovies)
  const movieViews = sortedMovies.map(movie => {
    return (
      <MovieProvider key={movie.id} movie={movie}>
        <MovieRow />
      </MovieProvider>
    )
  })
  return (
    <>
      {movieViews}
    </>
  )
}
