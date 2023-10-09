import { useContext } from 'react'
import moviesContext from './moviesContext'
import { MoviesContextValue } from '../../types'

export default function useMoviesContext (): MoviesContextValue {
  const value = useContext(moviesContext)
  if (value == null) {
    throw new Error('useMoviesContext must be used within a MoviesContextProvider')
  }
  return value
}
