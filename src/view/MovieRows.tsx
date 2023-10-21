import MovieProvider from '../context/movie/MovieProvider'
import useMoviesContext from '../context/movies/useMoviesContext'
import compareItems from '../service/compareItems'
import { Movie } from '../types'
import MovieRow from './MovieRow'

export default function MovieRows ({
  movies
}: {
  movies: Movie[]
}): JSX.Element {
  const moviesContextValue = useMoviesContext()
  const sortedMovies = movies.sort((a, b) => {
    return compareItems({ a, b, ...moviesContextValue })
  })
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
