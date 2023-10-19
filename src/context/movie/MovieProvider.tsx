import { ReactNode } from 'react'
import { HistoryMovie, Movie, MovieContextValue } from '../../types'
import movieContext from './movieContext'
import useMoviesContext from '../movies/useMoviesContext'
import getPoints from '../../service/getPoints'

export default function MovieProvider ({ children, movie }: {
  children: ReactNode
  movie?: Movie | HistoryMovie
}): JSX.Element {
  const moviesContextValue = useMoviesContext()
  if (movie == null) {
    return <></>
  }
  const url = `https://www.imdb.com/title/${movie.imdbId}`
  function open (): void {
    window.open(url, '_blank')
  }
  const label = `${movie.title} (${movie.year})`
  function remove (): void {
    if (movie == null) {
      throw new Error('There is no movie.')
    }
    moviesContextValue.removeMovie({ id: movie.id })
  }
  console.log('movie.points', movie.points)
  const points = movie.points ?? getPoints({
    item: movie,
    operations: moviesContextValue.operations
  })
  const value: MovieContextValue = {
    ...movie,
    label,
    remove,
    open,
    points,
    url
  }
  return (
    <movieContext.Provider value={value}>
      {children}
    </movieContext.Provider>
  )
}
