import { useContext } from 'react'
import { MovieContextValue } from '../../types'
import movieContext from './movieContext'

export default function useMovieContext (): MovieContextValue {
  const itemContextValue = useContext(movieContext)
  if (itemContextValue == null) {
    throw new Error('useItemContext must be used within an ItemContextProvider')
  }
  return itemContextValue
}
