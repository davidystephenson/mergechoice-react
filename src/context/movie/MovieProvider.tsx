import { ReactNode } from 'react'
import { Movie, MovieContextValue } from '../../types'
import movieContext from './movieContext'
import useMoviesContext from '../movies/useMoviesContext'
import getPoints from '../../service/mergeChoice/getPoints'

export default function MovieProvider (props: {
  children: ReactNode
  movie?: Movie
  points?: number
}): JSX.Element {
  const moviesContextValue = useMoviesContext()
  if (props.movie == null) {
    return <></>
  }
  const url = `https://www.imdb.com/title/${props.movie.imdbId}`
  function open (): void {
    window.open(url, '_blank')
  }
  const label = `${props.movie.name} (${props.movie.year})`
  async function remove (): Promise<void> {
    if (props.movie == null) {
      throw new Error('There is no movie.')
    }
    await moviesContextValue.removeMovie({ id: props.movie.id })
  }
  async function reset (): Promise<void> {
    if (props.movie == null) {
      throw new Error('There is no movie.')
    }
    await moviesContextValue.resetMovie({ id: props.movie.id })
  }
  console.log('MovieProvider props.points', props.points)
  const moviePoints = props.points ?? getPoints({
    itemId: props.movie.id,
    state: moviesContextValue.state
  })
  const value: MovieContextValue = {
    ...props.movie,
    label,
    remove,
    reset,
    open,
    points: moviePoints,
    url
  }
  return (
    <movieContext.Provider value={value}>
      {props.children}
    </movieContext.Provider>
  )
}
