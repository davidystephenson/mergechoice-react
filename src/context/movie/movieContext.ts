import { createContext } from 'react'
import { MovieContextValue } from '../../types'

const movieContext = createContext<MovieContextValue | null>(null)
export default movieContext
