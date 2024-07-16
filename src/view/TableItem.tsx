import EpisodeProvider from '../context/historyEvent/HistoryEventProvider'
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
      <EpisodeProvider episode={tableItem.historyArchiveHeading.episode}>
        <HistoryArchiveHeadingView />
      </EpisodeProvider>
    )
  }
  if (tableItem.historyArchiveMovie != null) {
    return (
      <EpisodeProvider episode={tableItem.historyArchiveMovie.episode}>
        <MovieProvider movie={tableItem.historyArchiveMovie.movie}>
          <HistoryArchiveRowView />
        </MovieProvider>
      </EpisodeProvider>
    )
  }
  if (tableItem.historyChoiceHeading != null) {
    return (
      <EpisodeProvider episode={tableItem.historyChoiceHeading.episode}>
        <HistoryChoiceHeadingRowView />
      </EpisodeProvider>
    )
  }
  if (tableItem.historyChoiceA != null) {
    return (
      <EpisodeProvider episode={tableItem.historyChoiceA.episode}>
        <HistoryChoiceARowView />
      </EpisodeProvider>
    )
  }
  if (tableItem.historyChoiceB != null) {
    return (
      <EpisodeProvider episode={tableItem.historyChoiceB.episode}>
        <HistoryChoiceBRowView />
      </EpisodeProvider>
    )
  }
  if (tableItem.historyImportHeading != null) {
    return (
      <EpisodeProvider episode={tableItem.historyImportHeading.episode}>
        <HistoryImportHeadingView />
      </EpisodeProvider>
    )
  }
  if (tableItem.historyImportMovie != null) {
    return (
      <EpisodeProvider episode={tableItem.historyImportMovie.episode}>
        <MovieProvider movie={tableItem.historyImportMovie.movie}>
          <HistoryImportRowView />
        </MovieProvider>
      </EpisodeProvider>
    )
  }
  if (tableItem.historyHeading === true) {
    return (
      <HistoryHeadingRowView />
    )
  }
  if (tableItem.historyRandomHeading != null) {
    return (
      <EpisodeProvider episode={tableItem.historyRandomHeading.episode}>
        <HistoryRandomHeadingRowView />
      </EpisodeProvider>
    )
  }
  if (tableItem.historyRandomMovie != null) {
    return (
      <EpisodeProvider episode={tableItem.historyRandomMovie.episode}>
        <MovieProvider movie={tableItem.historyRandomMovie.movie}>
          <HistoryRandomMovieView />
        </MovieProvider>
      </EpisodeProvider>
    )
  }
  if (tableItem.historyRemoveHeading != null) {
    return (
      <EpisodeProvider episode={tableItem.historyRemoveHeading.episode}>
        <HistoryRemoveHeadingView />
      </EpisodeProvider>
    )
  }
  if (tableItem.historyRemoveMovie != null) {
    return (
      <EpisodeProvider episode={tableItem.historyRemoveMovie.episode}>
        <MovieProvider
          movie={tableItem.historyRemoveMovie.movie}
          points={tableItem.historyRemoveMovie.movie.points}
        >
          <HistoryRemoveRowView />
        </MovieProvider>
      </EpisodeProvider>
    )
  }
  if (tableItem.historyResetHeading != null) {
    return (
      <EpisodeProvider episode={tableItem.historyResetHeading.episode}>
        <HistoryResetHeadingRowView />
      </EpisodeProvider>
    )
  }
  if (tableItem.historyResetMovie != null) {
    return (
      <EpisodeProvider episode={tableItem.historyResetMovie.episode}>
        <MovieProvider movie={tableItem.historyResetMovie.movie}>
          <HistoryResetMovieRowView />
        </MovieProvider>
      </EpisodeProvider>
    )
  }
  if (tableItem.historyUnarchiveHeading != null) {
    return (
      <EpisodeProvider episode={tableItem.historyUnarchiveHeading.episode}>
        <HistoryUnarchiveHeadingView />
      </EpisodeProvider>
    )
  }
  if (tableItem.historyUnarchiveMovie != null) {
    return (
      <EpisodeProvider episode={tableItem.historyUnarchiveMovie.episode}>
        <MovieProvider movie={tableItem.historyUnarchiveMovie.movie}>
          <HistoryUnarchiveRowView />
        </MovieProvider>
      </EpisodeProvider>
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
