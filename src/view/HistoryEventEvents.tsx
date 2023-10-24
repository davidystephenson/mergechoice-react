import HistoryChoiceEventView from './HistoryChoiceEvent'
import HistoryRemoveEventView from './HistoryRemoveEvent'

export default function HistoryEventEvents (): JSX.Element {
  return (
    <>
      <HistoryChoiceEventView />
      <HistoryRemoveEventView />
    </>
  )
}
