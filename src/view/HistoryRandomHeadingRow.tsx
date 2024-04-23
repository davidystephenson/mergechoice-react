import { Icon, HStack, Heading } from '@chakra-ui/react'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import RewindButtonView from './RewindButtonView'
import useHistoryEventContext from '../context/historyEvent/useHistoryEventContext'
import HistoryEventHeadingRowView from './HistoryEventHeadingRow'

export default function HistoryRandomHeadingRowView (): JSX.Element {
  const historyEventContextValue = useHistoryEventContext()
  if (historyEventContextValue.random == null) {
    throw new Error('There is no random choice.')
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
          <Icon as={GiPerspectiveDiceSixFacesRandom} />
        </HStack>
        <RewindButtonView />
      </HistoryEventHeadingRowView>
    </>
  )
}
