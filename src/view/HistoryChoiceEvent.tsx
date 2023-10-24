import { HStack, Heading, Icon } from '@chakra-ui/react'
import MovieProvider from '../context/movie/MovieProvider'
import useHistoryEventContext from '../context/historyEvent/useHistoryEventContext'
import HeadingRowView from './HeadingRow'
import HistoryChoiceRowView from './HistoryChoiceRow'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import RewindButtonView from './RewindButtonView'

export default function HistoryChoiceEventView (): JSX.Element {
  const historyEventContextValue = useHistoryEventContext()
  if (historyEventContextValue.choice == null) {
    return <></>
  }
  const cellProps = {
    paddingTop: 0,
    paddingBottom: 0,
    borderBottom: 0
  }
  const headingCellProps = {
    ...cellProps,
    borderBottom: '1px solid lightgray'
  }
  const randomIcon = historyEventContextValue.choice.random && (
    <Icon as={GiPerspectiveDiceSixFacesRandom} />
  )
  return (
    <>
      <HeadingRowView cellProps={headingCellProps}>
        <HStack>
          <Heading size='xs'>
            {historyEventContextValue.timestamp}
          </Heading>
          {randomIcon}
        </HStack>
        <RewindButtonView />
      </HeadingRowView>
      <MovieProvider movie={historyEventContextValue.choice.aItem} points={historyEventContextValue.choice.aItem.points}>
        <HistoryChoiceRowView />
      </MovieProvider>
      <MovieProvider movie={historyEventContextValue.choice.bItem} points={historyEventContextValue.choice.bItem.points}>
        <HistoryChoiceRowView />
      </MovieProvider>
    </>
  )
}
