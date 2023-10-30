import useHistoryEventContext from '../context/historyEvent/useHistoryEventContext'
import HistoryChoiceHeadingRowView from './HistoryChoiceHeadingRow'
import HistoryChoiceARowView from './HistoryChoiceARow'
import HistoryChoiceBRowView from './HistoryChoiceBRow'

export default function HistoryChoiceEventView (): JSX.Element {
  const historyEventContextValue = useHistoryEventContext()
  if (historyEventContextValue.choice == null) {
    throw new Error('There is no choice.')
  }
  return (
    <>
      <HistoryChoiceHeadingRowView />
      <HistoryChoiceARowView />
      <HistoryChoiceBRowView />
    </>
  )
}
