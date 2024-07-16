import { createContext } from 'react'
import { EpisodeContextValue } from '../../types'

const episodeContext = createContext<EpisodeContextValue | null>(null)
export default episodeContext
