import { UnlockIcon } from '@chakra-ui/icons'
import HistoryEventHeadingRowView from './HistoryEventHeadingRow'
import RewindButtonView from './RewindButtonView'
import useHistoryEventContext from '../context/historyEvent/useHistoryEventContext'
import { HStack, Heading } from '@chakra-ui/react'

export default function HistoryUnarchiveHeadingView (): JSX.Element {
  const historyEventContextValue = useHistoryEventContext()
  if (historyEventContextValue.unarchive == null) {
    throw new Error('There is no unarchive.')
  }
  return (
    <HistoryEventHeadingRowView>
      <HStack>
        <Heading size='xs'>
          {historyEventContextValue.timestamp}
        </Heading>
        <UnlockIcon />
      </HStack>
      <RewindButtonView />
    </HistoryEventHeadingRowView>
  )
}
