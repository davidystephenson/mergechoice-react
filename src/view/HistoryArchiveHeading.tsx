import { LockIcon } from '@chakra-ui/icons'
import HistoryEventHeadingRowView from './HistoryEventHeadingRow'
import RewindButtonView from './RewindButtonView'
import useHistoryEventContext from '../context/historyEvent/useHistoryEventContext'
import { HStack, Heading } from '@chakra-ui/react'

export default function HistoryArchiveHeadingView (): JSX.Element {
  const historyEventContextValue = useHistoryEventContext()
  if (historyEventContextValue.archive == null) {
    throw new Error('There is no archive.')
  }
  return (
    <HistoryEventHeadingRowView>
      <HStack>
        <Heading size='xs'>
          {historyEventContextValue.timestamp}
        </Heading>
        <LockIcon />
      </HStack>
      <RewindButtonView />
    </HistoryEventHeadingRowView>
  )
}
