import useHistoryContext from '../../context/history/useHistoryContext'
import useMoviesContext from '../../context/movies/useMoviesContext'
import { Movie, TableItem } from '../../types'
import { HistoryEvent } from '../mergeChoice/mergeChoiceTypes'
import isResult from './isResult'

export default function useTableItems (): TableItem[] {
  const historyContextValue = useHistoryContext()
  const moviesContextValue = useMoviesContext()
  const tableItems: TableItem[] = []
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
      const open = event.import.items.length === 1 || historyContextValue.openIds.includes(event.mergeChoiceId)
      if (!open) {
        return
      }
      event.import.items.forEach(item => {
        if (moviesContextValue.searching) {
          const match = isResult({ movie: item, query: moviesContextValue.query })
          if (!match) {
            return
          }
        }
        tableItems.push(
          { historyImportMovie: { event, movie: item } }
        )
      })
    }
    if (event.random != null) {
      tableItems.push(
        { historyRandomHeading: { event } },
        { historyRandomMovie: { event, movie: event.random.first } },
        { historyRandomMovie: { event, movie: event.random.second } }
      )
    }
    if (event.remove != null) {
      tableItems.push(
        { historyRemoveHeading: { event } },
        { historyRemoveMovie: { event, movie: event.remove.item } }
      )
    }
    if (event.reset != null) {
      tableItems.push(
        { historyResetHeading: { event } },
        { historyResetMovie: { event, movie: event.reset.item } }
      )
    }
  }
  if (Object.keys(moviesContextValue.archive).length > 0) {
    tableItems.push({
      archiveHeading: true
    })
  }
  for (const key in moviesContextValue.archive) {
    const movie = moviesContextValue.archive[key]
    tableItems.push({
      archiveList: {
        movie
      }
    })
  }
  if (historyContextValue.events.length > 0) {
    tableItems.push({
      historyHeading: true
    })
  }
  if (historyContextValue.firstEvent != null) {
    addEvent(historyContextValue.firstEvent)
  }
  if (historyContextValue.expanded) {
    historyContextValue.restEvents.forEach(event => {
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
    if (moviesContextValue.searching) {
      const match = isResult({ movie, query: moviesContextValue.query })
      if (!match) {
        return
      }
    }
    tableItems.push({
      list: {
        movie
      }
    })
  })
  return tableItems
}
