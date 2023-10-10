import useMoviesContext from '../context/movies/useMoviesContext'
import HistoryEventView from './HistoryEvent'
import HistoryEventProvider from '../context/historyEvent/HistoryEventProvider'
import { HStack, Heading, IconButton } from '@chakra-ui/react'
import { useState } from 'react'
import SingleRowView from './SingleRow'
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'

export default function ReviewView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  const [expanded, setExpanded] = useState(false)
  function toggle (): void {
    setExpanded(current => !current)
  }
  if (moviesContextValue.history.length === 0) {
    return <></>
  }
  const isSingle = moviesContextValue.history.length === 1
  const buttonView = isSingle
    ? <></>
    : expanded
      ? <IconButton aria-label='Collapse table' onClick={toggle} icon={<ArrowUpIcon />} />
      : <IconButton aria-label='Expand table' onClick={toggle} icon={<ArrowDownIcon />} />
  const headingView = (
    <>
      <SingleRowView cellProps={{ borderBottom: '1px solid lightgray', borderTop: '1px solid lightgray' }}>
        <HStack justifyContent='center' spacing={0}>
          <Heading size='sm'>History</Heading>
          {buttonView}
        </HStack>
      </SingleRowView>
    </>
  )
  const [first, ...rest] = moviesContextValue.history
  const firstEventView = (
    <HistoryEventProvider key={first.id} historyEvent={first}>
      <HistoryEventView />
    </HistoryEventProvider>
  )
  if (isSingle) {
    return (
      <>
        {headingView}
        {firstEventView}
      </>
    )
  }
  const restViews = expanded && rest.map(historyEvent => {
    return (
      <HistoryEventProvider key={historyEvent.id} historyEvent={historyEvent}>
        <HistoryEventView />
      </HistoryEventProvider>
    )
  })
  return (
    <>
      {headingView}
      {firstEventView}
      {restViews}
    </>
  )
}
