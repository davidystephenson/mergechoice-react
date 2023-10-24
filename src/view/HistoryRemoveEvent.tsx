import { HStack, Heading } from '@chakra-ui/react'
import useHistoryEventContext from '../context/historyEvent/useHistoryEventContext'
import HeadingRowView from './HeadingRow'
import RewindButtonView from './RewindButtonView'
import { DeleteIcon } from '@chakra-ui/icons'
import MovieProvider from '../context/movie/MovieProvider'
import HistoryRemoveRowView from './HistoryRemoveRow'

export default function HistoryRemoveEventView (): JSX.Element {
  const historyEventContextValue = useHistoryEventContext()
  if (historyEventContextValue.remove == null) {
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
  return (
    <>
      <HeadingRowView cellProps={headingCellProps}>
        <HStack>
          <Heading size='xs'>
            {historyEventContextValue.timestamp}
          </Heading>
          <DeleteIcon />
        </HStack>
        <RewindButtonView />
      </HeadingRowView>
      <MovieProvider
        movie={historyEventContextValue.remove.item}
        points={historyEventContextValue.remove.item.points}
      >
        <HistoryRemoveRowView />
      </MovieProvider>
    </>
  )
}
