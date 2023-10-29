import useMoviesContext from '../../context/movies/useMoviesContext'
import { TableItem } from '../../types'

export default function useTableItems (): TableItem[] {
  const moviesContextValue = useMoviesContext()
  const tableItems: TableItem[] = []
  moviesContextValue.sortedMovies.forEach(movie => {
    tableItems.push({
      list: {
        movie
      }
    })
  })
  return tableItems
}
