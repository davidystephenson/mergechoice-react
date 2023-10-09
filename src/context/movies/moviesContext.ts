import { createContext } from 'react'
import { MoviesContextValue } from '../../types'

const moviesContext = createContext<MoviesContextValue | null>(null)
export default moviesContext
