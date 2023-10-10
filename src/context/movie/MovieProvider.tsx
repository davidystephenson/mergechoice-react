import { ReactNode } from 'react'
import { Movie, MovieContextValue } from '../../types'
import movieContext from './movieContext'
import useMoviesContext from '../movies/useMoviesContext'

export default function MovieProvider ({ children, movie }: {
  children: ReactNode
  movie?: Movie
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
  const value: MovieContextValue = {
    ...movie,
    label,
    remove,
    open,
    url
  }
  return (
    <movieContext.Provider value={value}>
      {children}
    </movieContext.Provider>
  )
}
