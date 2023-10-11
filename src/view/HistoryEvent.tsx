import { Heading, IconButton } from '@chakra-ui/react'
import MovieProvider from '../context/movie/MovieProvider'
import useHistoryEventContext from '../context/historyEvent/useHistoryEventContext'
import { ArrowLeftIcon } from '@chakra-ui/icons'
import HeadingRowView from './HeadingRow'
import HistoryRowView from './HistoryRow'

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
  return (
    <>
      <HeadingRowView cellProps={headingCellProps}>
        <Heading size='xs'>{historyEventContextValue.timestamp}</Heading>
        <IconButton
          aria-label='Rewind choice'
          icon={<ArrowLeftIcon />}
          size='xs'
          onClick={handleClick}
          variant='link'
        />
      </HeadingRowView>
      <MovieProvider movie={historyEventContextValue.aItem}>
        <HistoryRowView />
      </MovieProvider>
      <MovieProvider movie={historyEventContextValue.bItem}>
        <HistoryRowView />
      </MovieProvider>
    </>
  )
}
