import useHistoryContext from '../context/history/useHistoryContext'
import HistoryEventProvider from '../context/historyEvent/HistoryEventProvider'
import HistoryEventView from './HistoryEvent'

export default function RestHistoryEvents (): JSX.Element {
  const historyContextValue = useHistoryContext()
  if (!historyContextValue.expanded) {
    return <></>
  }
  const views = historyContextValue.events.map(historyEvent => {
    return (
      <HistoryEventProvider key={historyEvent.id} historyEvent={historyEvent}>
        <HistoryEventView />
      </HistoryEventProvider>
    )
  })
  return <>{views}</>
}
