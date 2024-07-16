import useHistoryContext from '../../context/history/useHistoryContext'
import useMoviesContext from '../../context/movies/useMoviesContext'
import { Movie, TableItem } from '../../types'
import { Episode } from '../mergechoice/mergeChoiceTypes'
import isResult from './isResult'

export default function useTableItems (): TableItem[] {
  const historyContextValue = useHistoryContext()
  const moviesContextValue = useMoviesContext()
  const tableItems: TableItem[] = []
  function addEpisode (episode: Episode<Movie>): void {
    if (episode.archive != null) {
      tableItems.push(
        { historyArchiveHeading: { episode } },
        { historyArchiveMovie: { episode, movie: episode.archive.item } }
      )
    }
    if (episode.choice != null) {
      tableItems.push(
        { historyChoiceHeading: { episode } },
        { historyChoiceA: { episode } },
        { historyChoiceB: { episode } }
      )
      return
    }
    if (episode.import != null) {
      tableItems.push(
        { historyImportHeading: { episode } }
      )
      const open = episode.import.items.length === 1 || historyContextValue.openIds.includes(episode.mergeChoiceId)
      if (!open) {
        return
      }
      episode.import.items.forEach(item => {
        if (moviesContextValue.searching) {
          const match = isResult({ movie: item, query: moviesContextValue.query })
          if (!match) {
            return
          }
        }
        tableItems.push(
          { historyImportMovie: { episode, movie: item } }
        )
      })
    }
    if (episode.random != null) {
      tableItems.push(
        { historyRandomHeading: { episode } },
        { historyRandomMovie: { episode, movie: episode.random.first } },
        { historyRandomMovie: { episode, movie: episode.random.second } }
      )
    }
    if (episode.remove != null) {
      tableItems.push(
        { historyRemoveHeading: { episode } },
        { historyRemoveMovie: { episode, movie: episode.remove.item } }
      )
    }
    if (episode.reset != null) {
      tableItems.push(
        { historyResetHeading: { episode } },
        { historyResetMovie: { episode, movie: episode.reset.item } }
      )
    }
    if (episode.unarchive != null) {
      tableItems.push(
        { historyUnarchiveHeading: { episode } },
        { historyUnarchiveMovie: { episode, movie: episode.unarchive.item } }
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
  if (historyContextValue.episodes.length > 0) {
    tableItems.push({
      historyHeading: true
    })
  }
  if (historyContextValue.firstEpisode != null) {
    addEpisode(historyContextValue.firstEpisode)
  }
  if (historyContextValue.expanded) {
    historyContextValue.restEpisodes.forEach(episode => {
      addEpisode(episode)
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
