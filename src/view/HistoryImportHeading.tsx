import { HStack, Heading, Icon, Text } from '@chakra-ui/react'
import { BsCloudUpload } from 'react-icons/bs'
import ExpandButtonView from './ExpandButtonView'
import HeadingRowView from './HeadingRow'
import RewindButtonView from './RewindButtonView'
import useHistoryEventContext from '../context/historyEvent/useHistoryEventContext'
import useHistoryContext from '../context/history/useHistoryContext'

export default function HistoryImportHeadingView (): JSX.Element {
  const historyContextValue = useHistoryContext()
  const historyEventContextValue = useHistoryEventContext()
  if (historyEventContextValue.import == null) {
    throw new Error('There is no import.')
  }
  const open = historyContextValue.openIds.includes(historyEventContextValue.id)
  function handleOpenClick (): void {
    historyContextValue.toggleEvent(historyEventContextValue.id)
  }
  return (
    <HeadingRowView
      borderBottom='1px solid lightgray'
      paddingTop={0}
      paddingBottom={0}
    >
      <HStack>
        <Heading size='xs'>
          {historyEventContextValue.timestamp}
        </Heading>
        <Icon as={BsCloudUpload} />
        <Text>({historyEventContextValue.import.items.length})</Text>
      </HStack>
      <HStack>
        <RewindButtonView />
        <ExpandButtonView open={open} onClick={handleOpenClick} />
      </HStack>
    </HeadingRowView>
  )
}
