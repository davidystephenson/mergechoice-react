import { ReactNode } from 'react'
import { EpisodeContextValue, Movie } from '../../types'
import episodeContext from './episodeContext'
import useMoviesContext from '../movies/useMoviesContext'
import { Episode } from '../../service/mergechoice/mergeChoiceTypes'

export default function EpisodeProvider (props: {
  children: ReactNode
  episode: Episode<Movie>
}): JSX.Element {
  const moviesContextValue = useMoviesContext()
  async function rewind (): Promise<void> {
    await moviesContextValue.rewind({
      episodeId: props.episode.mergeChoiceId
    })
  }
  const timestamp = new Date(props.episode.createdAt).toLocaleString()
  const value: EpisodeContextValue = {
    ...props.episode,
    rewind,
    timestamp
  }
  return (
    <episodeContext.Provider value={value}>
      {props.children}
    </episodeContext.Provider>
  )
}
