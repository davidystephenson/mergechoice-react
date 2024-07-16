import useEpisodeContext from '../context/historyEvent/useHistoryEventContext'
import MovieProvider from '../context/movie/MovieProvider'
import HistoryChoiceRowView from './HistoryChoiceRow'

export default function HistoryChoiceARowView (): JSX.Element {
  const episodeContextValue = useEpisodeContext()
  if (episodeContextValue.choice == null) {
    throw new Error('There is no choice.')
  }
  return (
    <MovieProvider
      movie={episodeContextValue.choice.aItem}
      points={episodeContextValue.choice.aItem.points}
    >
      <HistoryChoiceRowView />
    </MovieProvider>
  )
}
