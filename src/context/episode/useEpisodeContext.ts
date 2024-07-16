import { useContext } from 'react'
import { EpisodeContextValue } from '../../types'
import episodeContext from './episodeContext'

export default function useEpisodeContext (): EpisodeContextValue {
  const value = useContext(episodeContext)
  if (value === null) {
    throw new Error('useEpisodeContext must be used within a EpisodeContextProvider')
  }
  return value
}
