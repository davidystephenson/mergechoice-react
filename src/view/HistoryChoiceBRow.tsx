import useEpisodeContext from '../context/historyEvent/useHistoryEventContext'
import MovieProvider from '../context/movie/MovieProvider'
import HistoryChoiceRowView from './HistoryChoiceRow'

export default function HistoryChoiceBRowView (): JSX.Element {
  const episodeContextValue = useEpisodeContext()
  if (episodeContextValue.choice == null) {
    throw new Error('There is no choice.')
  }
  return (
    <MovieProvider
      movie={episodeContextValue.choice.bItem}
      points={episodeContextValue.choice.bItem.points}
    >
      <HistoryChoiceRowView />
    </MovieProvider>
  )
}
