import useHistoryEventContext from '../context/historyEvent/useHistoryEventContext'
import MovieProvider from '../context/movie/MovieProvider'
import HistoryChoiceRowView from './HistoryChoiceRow'

export default function HistoryChoiceARowView (): JSX.Element {
  const historyEventContextValue = useHistoryEventContext()
  if (historyEventContextValue.choice == null) {
    throw new Error('There is no choice.')
  }
  return (
    <MovieProvider
      movie={historyEventContextValue.choice.aItem}
      points={historyEventContextValue.choice.aItem.points}
    >
      <HistoryChoiceRowView />
    </MovieProvider>
  )
}
