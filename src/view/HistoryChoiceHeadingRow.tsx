import { Icon, HStack, Heading } from '@chakra-ui/react'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import RewindButtonView from './RewindButtonView'
import useHistoryEventContext from '../context/historyEvent/useHistoryEventContext'
import HistoryEventHeadingRowView from './HistoryEventHeadingRow'

export default function HistoryChoiceHeadingRowView (): JSX.Element {
  const historyEventContextValue = useHistoryEventContext()
  if (historyEventContextValue.choice == null) {
    throw new Error('There is no choice.')
  }
  const randomIcon = historyEventContextValue.choice.random && (
    <Icon as={GiPerspectiveDiceSixFacesRandom} />
  )
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
          {randomIcon}
        </HStack>
        <RewindButtonView />
      </HistoryEventHeadingRowView>
    </>
  )
}
