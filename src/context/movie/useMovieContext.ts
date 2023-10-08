import { useContext } from 'react'
import { Movie } from '../../types'
import movieContext from './movieContext'

export default function useMovieContext (): Movie {
  const itemContextValue = useContext(movieContext)
  if (itemContextValue == null) {
    throw new Error('useItemContext must be used within an ItemContextProvider')
  }
  return itemContextValue
}
