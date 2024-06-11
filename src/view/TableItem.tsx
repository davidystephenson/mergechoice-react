import HistoryEventProvider from '../context/historyEvent/HistoryEventProvider'
import MovieProvider from '../context/movie/MovieProvider'
import useTableItemContext from '../context/tableItem/useTableItemContext'
import ArchiveHeadingRowView from './ArchiveHeadingRow'
import ArchiveListRowView from './ArchiveListRow'
import HistoryArchiveHeadingView from './HistoryArchiveHeading'
import HistoryArchiveRowView from './HistoryArchiveRow'
import HistoryChoiceARowView from './HistoryChoiceARow'
import HistoryChoiceBRowView from './HistoryChoiceBRow'
import HistoryChoiceHeadingRowView from './HistoryChoiceHeadingRow'
import HistoryHeadingRowView from './HistoryHeadingRow'
import HistoryImportHeadingView from './HistoryImportHeading'
import HistoryImportRowView from './HistoryImportRow'
import HistoryRandomHeadingRowView from './HistoryRandomHeadingRow'
import HistoryRandomMovieView from './HistoryRandomMovieRow'
import HistoryRemoveHeadingView from './HistoryRemoveHeading'
import HistoryRemoveRowView from './HistoryRemoveRow'
import HistoryResetHeadingRowView from './HistoryResetHeadingRow'
import HistoryResetMovieRowView from './HistoryResetMovieRow'
import HistoryUnarchiveHeadingView from './HistoryUnarchiveHeading'
import HistoryUnarchiveRowView from './HistoryUnarchiveRow'
import MovieHeadingRowView from './MovieHeadingRow'
import MovieHeadingsRowView from './MovieHeadingsRow'
import MovieListRow from './MovieListRow'

export default function TableItemView (): JSX.Element {
  const tableItem = useTableItemContext()
  if (tableItem.archiveHeading === true) {
    return (
      <ArchiveHeadingRowView />
    )
  }
  if (tableItem.archiveList != null) {
    return (
      <MovieProvider movie={tableItem.archiveList.movie}>
        <ArchiveListRowView />
      </MovieProvider>
    )
  }
  if (tableItem.historyArchiveHeading != null) {
    return (
      <HistoryEventProvider historyEvent={tableItem.historyArchiveHeading.event}>
        <HistoryArchiveHeadingView />
      </HistoryEventProvider>
    )
  }
  if (tableItem.historyArchiveMovie != null) {
    return (
      <HistoryEventProvider historyEvent={tableItem.historyArchiveMovie.event}>
        <MovieProvider movie={tableItem.historyArchiveMovie.movie}>
          <HistoryArchiveRowView />
        </MovieProvider>
      </HistoryEventProvider>
    )
  }
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
  if (tableItem.historyRandomHeading != null) {
    return (
      <HistoryEventProvider historyEvent={tableItem.historyRandomHeading.event}>
        <HistoryRandomHeadingRowView />
      </HistoryEventProvider>
    )
  }
  if (tableItem.historyRandomMovie != null) {
    return (
      <HistoryEventProvider historyEvent={tableItem.historyRandomMovie.event}>
        <MovieProvider movie={tableItem.historyRandomMovie.movie}>
          <HistoryRandomMovieView />
        </MovieProvider>
      </HistoryEventProvider>
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
  if (tableItem.historyResetHeading != null) {
    return (
      <HistoryEventProvider historyEvent={tableItem.historyResetHeading.event}>
        <HistoryResetHeadingRowView />
      </HistoryEventProvider>
    )
  }
  if (tableItem.historyResetMovie != null) {
    return (
      <HistoryEventProvider historyEvent={tableItem.historyResetMovie.event}>
        <MovieProvider movie={tableItem.historyResetMovie.movie}>
          <HistoryResetMovieRowView />
        </MovieProvider>
      </HistoryEventProvider>
    )
  }
  if (tableItem.historyUnarchiveHeading != null) {
    return (
      <HistoryEventProvider historyEvent={tableItem.historyUnarchiveHeading.event}>
        <HistoryUnarchiveHeadingView />
      </HistoryEventProvider>
    )
  }
  if (tableItem.historyUnarchiveMovie != null) {
    return (
      <HistoryEventProvider historyEvent={tableItem.historyUnarchiveMovie.event}>
        <MovieProvider movie={tableItem.historyUnarchiveMovie.movie}>
          <HistoryUnarchiveRowView />
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
