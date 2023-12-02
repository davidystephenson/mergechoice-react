import { ReactNode } from 'react'
import { Movie, MovieContextValue } from '../../types'
import movieContext from './movieContext'
import useMoviesContext from '../movies/useMoviesContext'
import getPoints from '../../service/mergeChoice/getPoints'

export default function MovieProvider ({ children, movie, points }: {
  children: ReactNode
  movie?: Movie
  points?: number
}): JSX.Element {
  const moviesContextValue = useMoviesContext()
  if (movie == null) {
    return <></>
  }
  const url = `https://www.imdb.com/title/${movie.imdbId}`
  function open (): void {
    window.open(url, '_blank')
  }
  const label = `${movie.name} (${movie.year})`
  async function remove (): Promise<void> {
    if (movie == null) {
      throw new Error('There is no movie.')
    }
    await moviesContextValue.removeMovie({ id: movie.id })
  }
  async function reset (): Promise<void> {
    if (movie == null) {
      throw new Error('There is no movie.')
    }
    await moviesContextValue.resetMovie({ id: movie.id })
  }
  const moviePoints = points ?? getPoints({
    itemId: movie.id,
    state: moviesContextValue.state
  })
  const value: MovieContextValue = {
    ...movie,
    label,
    remove,
    reset,
    open,
    points: moviePoints,
    url
  }
  return (
    <movieContext.Provider value={value}>
      {children}
    </movieContext.Provider>
  )
}
