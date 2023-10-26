import HistoryChoiceEventView from './HistoryChoiceEvent'
import HistoryImportEventView from './HistoryImportEvent'
import HistoryRemoveEventView from './HistoryRemoveEvent'

export default function HistoryEventEvents (): JSX.Element {
  return (
    <>
      <HistoryChoiceEventView />
      <HistoryRemoveEventView />
      <HistoryImportEventView />
    </>
  )
}
