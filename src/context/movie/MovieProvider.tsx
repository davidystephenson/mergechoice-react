import { ReactNode } from 'react'
import { Movie, MovieContextValue } from '../../types'
import movieContext from './movieContext'

export default function MovieProvider ({ children, movie }: {
  children: ReactNode
  movie?: Movie
}): JSX.Element {
  if (movie == null) {
    return <></>
  }
  const url = `https://www.imdb.com/title/${movie.imdbId}`
  function open (): void {
    window.open(url, '_blank')
  }
  const value: MovieContextValue = {
    ...movie,
    open,
    url
  }
  return (
    <movieContext.Provider value={value}>
      {children}
    </movieContext.Provider>
  )
}
