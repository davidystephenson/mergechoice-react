import useHistoryContext from '../context/history/useHistoryContext'
import HistoryEventProvider from '../context/historyEvent/HistoryEventProvider'
import HistoryEventView from './HistoryEvent'

export default function RestHistoryEvents (): JSX.Element {
  const historyContextValue = useHistoryContext()
  if (!historyContextValue.expanded) {
    return <></>
  }
  const [, ...rest] = historyContextValue.events
  const views = rest.map(historyEvent => {
    return (
      <HistoryEventProvider key={historyEvent.id} historyEvent={historyEvent}>
        <HistoryEventView />
      </HistoryEventProvider>
    )
  })
  return <>{views}</>
}
