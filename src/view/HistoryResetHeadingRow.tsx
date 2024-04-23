import { HStack, Heading } from '@chakra-ui/react'
import RewindButtonView from './RewindButtonView'
import useHistoryEventContext from '../context/historyEvent/useHistoryEventContext'
import HistoryEventHeadingRowView from './HistoryEventHeadingRow'
import { RepeatIcon } from '@chakra-ui/icons'

export default function HistoryResetHeadingRowView (): JSX.Element {
  const historyEventContextValue = useHistoryEventContext()
  if (historyEventContextValue.reset == null) {
    throw new Error('There is no reset choice.')
  }
  return (
    <>
      <HistoryEventHeadingRowView
        borderBottom='1px solid lightgray'
        paddingTop={0}
        paddingBottom={0}
      >
        <HStack>
          <Heading size='xs'>
            {historyEventContextValue.timestamp}
          </Heading>
          <RepeatIcon />
        </HStack>
        <RewindButtonView />
      </HistoryEventHeadingRowView>
    </>
  )
}
