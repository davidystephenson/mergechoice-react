import { Heading } from '@chakra-ui/react'
import useHistoryContext from '../context/history/useHistoryContext'
import HistoryButtonView from './HistoryButton'
import HeadingRowView from './HeadingRow'
import FirstHistoryEvent from './FirstHistoryEvent'
import RestHistoryEvents from './RestHistoryEvents'

export default function HistoryView (): JSX.Element {
  const historyContextValue = useHistoryContext()
  if (historyContextValue.events.length === 0) {
    return <></>
  }
  function handleClick (): void {
    historyContextValue.toggleExpanded()
  }
  return (
    <>
      <HeadingRowView onClick={handleClick} cursor='pointer'>
        <Heading size='sm'>History ({historyContextValue.events.length})</Heading>
        <HistoryButtonView />
      </HeadingRowView>
      <FirstHistoryEvent />
      <RestHistoryEvents />
    </>
  )
}
