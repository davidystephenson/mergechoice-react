import useHistoryContext from '../context/history/useHistoryContext'
import FirstHistoryEvent from './FirstHistoryEvent'
import RestHistoryEvents from './RestHistoryEvents'

export default function HistoryView (): JSX.Element {
  const historyContextValue = useHistoryContext()
  if (historyContextValue.events.length === 0) {
    return <></>
  }
  return (
    <>
      <FirstHistoryEvent />
      <RestHistoryEvents />
    </>
  )
}
