import HistoryEventProvider from '../context/historyEvent/HistoryEventProvider'
import MovieProvider from '../context/movie/MovieProvider'
import useTableItemContext from '../context/tableItem/useTableItemContext'
import HistoryChoiceARowView from './HistoryChoiceARow'
import HistoryChoiceBRowView from './HistoryChoiceBRow'
import HistoryChoiceHeadingRowView from './HistoryChoiceHeadingRow'
import HistoryHeadingRowView from './HistoryHeadingRow'
import HistoryImportHeadingView from './HistoryImportHeading'
import HistoryImportRowView from './HistoryImportRow'
import HistoryRemoveHeadingView from './HistoryRemoveHeading'
import HistoryRemoveRowView from './HistoryRemoveRow'
import MovieHeadingRowView from './MovieHeadingRow'
import MovieHeadingsRowView from './MovieHeadingsRow'
import MovieListRow from './MovieListRow'

export default function TableItemView (): JSX.Element {
  const tableItem = useTableItemContext()
  if (tableItem.historyChoiceHeading != null) {
    return (
      <HistoryEventProvider historyEvent={tableItem.historyChoiceHeading.event}>
        <HistoryChoiceHeadingRowView />
      </HistoryEventProvider>
    )
  }
  if (tableItem.historyChoiceA != null) {
    return (
      <HistoryEventProvider historyEvent={tableItem.historyChoiceA.event}>
        <HistoryChoiceARowView />
      </HistoryEventProvider>
    )
  }
  if (tableItem.historyChoiceB != null) {
    return (
      <HistoryEventProvider historyEvent={tableItem.historyChoiceB.event}>
        <HistoryChoiceBRowView />
      </HistoryEventProvider>
    )
  }
  if (tableItem.historyImportHeading != null) {
    return (
      <HistoryEventProvider historyEvent={tableItem.historyImportHeading.event}>
        <HistoryImportHeadingView />
      </HistoryEventProvider>
    )
  }
  if (tableItem.historyImportMovie != null) {
    return (
      <HistoryEventProvider historyEvent={tableItem.historyImportMovie.event}>
        <MovieProvider movie={tableItem.historyImportMovie.movie}>
          <HistoryImportRowView />
        </MovieProvider>
      </HistoryEventProvider>
    )
  }
  if (tableItem.historyHeading === true) {
    return (
      <HistoryHeadingRowView />
    )
  }
  if (tableItem.historyRemoveHeading != null) {
    return (
      <HistoryEventProvider historyEvent={tableItem.historyRemoveHeading.event}>
        <HistoryRemoveHeadingView />
      </HistoryEventProvider>
    )
  }
  if (tableItem.historyRemoveMovie != null) {
    return (
      <HistoryEventProvider historyEvent={tableItem.historyRemoveMovie.event}>
        <MovieProvider
          movie={tableItem.historyRemoveMovie.movie}
          points={tableItem.historyRemoveMovie.movie.points}
        >
          <HistoryRemoveRowView />
        </MovieProvider>
      </HistoryEventProvider>
    )
  }
  if (tableItem.list != null) {
    return (
      <MovieProvider
        movie={tableItem.list.movie}
        points={tableItem.list.movie.points}
      >
        <MovieListRow />
      </MovieProvider>
    )
  }
  if (tableItem.movieHeading === true) {
    return (
      <MovieHeadingRowView />
    )
  }
  if (tableItem.movieHeadings === true) {
    return (
      <MovieHeadingsRowView />
    )
  }
  const json = JSON.stringify(tableItem)
  const message = `Invalid table item: ${json}`
  throw new Error(message)
}
