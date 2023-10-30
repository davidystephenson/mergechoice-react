import { DeleteIcon } from '@chakra-ui/icons'
import { HStack, Heading } from '@chakra-ui/react'
import HistoryEventHeadingRowView from './HistoryEventHeadingRow'
import RewindButtonView from './RewindButtonView'
import useHistoryEventContext from '../context/historyEvent/useHistoryEventContext'

export default function HistoryRemoveHeadingView (): JSX.Element {
  const historyEventContextValue = useHistoryEventContext()
  return (
    <HistoryEventHeadingRowView>
      <HStack>
        <Heading size='xs'>
          {historyEventContextValue.timestamp}
        </Heading>
        <DeleteIcon />
      </HStack>
      <RewindButtonView />
    </HistoryEventHeadingRowView>
  )
}
