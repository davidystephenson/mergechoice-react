import MovieProvider from '../context/movie/MovieProvider'
import { Movie } from '../types'
import MovieRow from './MovieRow'

export default function MovieRows ({
  movies
}: {
  movies: Movie[]
}): JSX.Element {
  const movieViews = movies.map(movie => {
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
