import useMoviesContext from '../context/movies/useMoviesContext'
import findById from '../service/findById'
import { Movie } from '../types'

export default function useFindByOption ({ optionIndex }: {
  optionIndex: number
}): Movie | undefined {
  const moviesContextValue = useMoviesContext()
  if (moviesContextValue.finalized) {
    return undefined
  }
  const itemId = moviesContextValue.choice.options[optionIndex]
  if (itemId == null) {
    return undefined
  }
  const item = findById({
    items: moviesContextValue.items, id: itemId
  })
  return item
}
