import useHistoryContext from '../context/history/useHistoryContext'
import HistoryEventProvider from '../context/historyEvent/HistoryEventProvider'
import useMoviesContext from '../context/movies/useMoviesContext'
import HistoryEventView from './HistoryEvent'

export default function FirstHistoryEvent (): JSX.Element {
  const historyContextValue = useHistoryContext()
  const moviesContextValue = useMoviesContext()
  const collapsed = !historyContextValue.expanded && moviesContextValue.finalized
  if (collapsed || historyContextValue.firstEvent == null) {
    return <></>
  }
  return (
    <HistoryEventProvider historyEvent={historyContextValue.firstEvent}>
      <HistoryEventView />
    </HistoryEventProvider>
  )
}
