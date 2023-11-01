import { Heading } from '@chakra-ui/react'
import HeadingRowView from './HeadingRow'
import HistoryButtonView from './HistoryButton'
import useHistoryContext from '../context/history/useHistoryContext'

export default function HistoryHeadingRowView (): JSX.Element {
  const historyContextValue = useHistoryContext()
  function handleClick (): void {
    historyContextValue.toggleExpanded()
  }
  return (
    <HeadingRowView onClick={handleClick} cursor='pointer'>
      <Heading size='sm'>History ({historyContextValue.resultEvents.length})</Heading>
      <HistoryButtonView />
    </HeadingRowView>
  )
}
