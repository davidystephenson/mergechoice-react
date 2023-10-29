import useMoviesContext from '../../context/movies/useMoviesContext'
import { TableItem } from '../../types'

export default function useTableItems (): TableItem[] {
  const moviesContextValue = useMoviesContext()
  const tableItems: TableItem[] = []
  tableItems.push({
    movieHeadingRow: true
  })
  if (moviesContextValue.sortedMovies.length > 0) {
    tableItems.push({
      movieHeadingsRow: true
    })
  }
  moviesContextValue.sortedMovies.forEach(movie => {
    tableItems.push({
      list: {
        movie
      }
    })
  })
  return tableItems
}
