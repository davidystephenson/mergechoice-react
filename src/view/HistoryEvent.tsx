import { HStack, Heading, IconButton } from '@chakra-ui/react'
import MovieProvider from '../context/movie/MovieProvider'
import MovieRow from './MovieRow'
import useHistoryEventContext from '../context/historyEvent/useHistoryEventContext'
import SingleRowView from './SingleRow'
import { ArrowLeftIcon } from '@chakra-ui/icons'

export default function HistoryEventView (): JSX.Element {
  const historyEventContextValue = useHistoryEventContext()
  const cellProps = {
    paddingTop: 0,
    paddingBottom: 0,
    borderBottom: 0
  }
  const bottomCellProps = {
    ...cellProps,
    borderBottom: '1px solid lightgray'
  }
  function handleClick (): void {
    historyEventContextValue.rewind()
  }
  return (
    <>
      <MovieProvider movie={historyEventContextValue.betterMovie}>
        <MovieRow cellProps={cellProps} />
      </MovieProvider>
      <SingleRowView cellProps={cellProps}>
        <Heading size='sm'>&gt;</Heading>
      </SingleRowView>
      <MovieProvider movie={historyEventContextValue.worseMovie}>
        <MovieRow cellProps={cellProps} />
      </MovieProvider>
      <SingleRowView cellProps={bottomCellProps}>
        <HStack justifyContent='center' spacing='0'>
          <IconButton
            aria-label='Rewind choice'
            icon={<ArrowLeftIcon />}
            size='xs'
            onClick={handleClick}
          />
          <Heading size='xs'>{new Date(historyEventContextValue.createdAt).toLocaleString()}</Heading>
        </HStack>
      </SingleRowView>
    </>
  )
}
