import { useContext } from 'react'
import { MovieContextValue } from '../../types'
import movieContext from './movieContext'

export default function useMovieContext (): MovieContextValue {
  const movieContextValue = useContext(movieContext)
  if (movieContextValue == null) {
    throw new Error('useMovieContext must be used within a MovieContextProvider')
  }
  return movieContextValue
}
