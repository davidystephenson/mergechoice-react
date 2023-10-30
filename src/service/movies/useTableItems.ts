import useHistoryContext from '../../context/history/useHistoryContext'
import useMoviesContext from '../../context/movies/useMoviesContext'
import { Movie, TableItem } from '../../types'
import { HistoryEvent } from '../mergeChoice/types'

export default function useTableItems (): TableItem[] {
  const historyContextValue = useHistoryContext()
  const moviesContextValue = useMoviesContext()
  const tableItems: TableItem[] = []
  const [firstEvent, ...restEvents] = historyContextValue.events
  function addEvent (event: HistoryEvent<Movie>): void {
    if (event.choice != null) {
      tableItems.push(
        { historyChoiceHeading: { event } },
        { historyChoiceA: { event } },
        { historyChoiceB: { event } }
      )
      return
    }
    if (event.import != null) {
      tableItems.push(
        { historyImportHeading: { event } }
      )
      const open = historyContextValue.openIds.includes(event.id)
      if (!open) {
        return
      }
      event.import.items.forEach(item => {
        tableItems.push(
          { historyImportMovie: { event, movie: item } }
        )
      })
    }
    if (event.remove != null) {
      tableItems.push(
        { historyRemoveHeading: { event } },
        { historyRemoveMovie: { event, movie: event.remove.item } }
      )
    }
  }
  if (historyContextValue.events.length > 0) {
    tableItems.push({
      historyHeading: true
    })
    addEvent(firstEvent)
  }
  if (historyContextValue.expanded) {
    restEvents.forEach(event => {
      addEvent(event)
    })
  }
  tableItems.push({
    movieHeading: true
  })
  if (moviesContextValue.sortedMovies.length > 0) {
    tableItems.push({
      movieHeadings: true
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
