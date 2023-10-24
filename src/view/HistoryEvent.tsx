import { HStack, Heading, Icon, IconButton, Text } from '@chakra-ui/react'
import MovieProvider from '../context/movie/MovieProvider'
import useHistoryEventContext from '../context/historyEvent/useHistoryEventContext'
import { ArrowLeftIcon, LockIcon } from '@chakra-ui/icons'
import HeadingRowView from './HeadingRow'
import HistoryRowView from './HistoryRow'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'

export default function HistoryEventView (): JSX.Element {
  const historyEventContextValue = useHistoryEventContext()
  const cellProps = {
    paddingTop: 0,
    paddingBottom: 0,
    borderBottom: 0
  }
  const headingCellProps = {
    ...cellProps,
    borderBottom: '1px solid lightgray'
  }
  function handleClick (): void {
    historyEventContextValue.rewind()
  }
  const rewindView = historyEventContextValue.previousState == null
    ? (
      <LockIcon my='5px' />
      )
    : (
      <IconButton
        aria-label='Rewind choice'
        icon={<ArrowLeftIcon />}
        size='xs'
        onClick={handleClick}
        variant='link'
      />
      )
  const randomIcon = historyEventContextValue.random && (
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
        {rewindView}
      </HeadingRowView>
      <MovieProvider movie={historyEventContextValue.aItem} points={historyEventContextValue.aItem.points}>
        <HistoryRowView />
      </MovieProvider>
      <MovieProvider movie={historyEventContextValue.bItem} points={historyEventContextValue.bItem.points}>
        <HistoryRowView />
      </MovieProvider>
    </>
  )
}
