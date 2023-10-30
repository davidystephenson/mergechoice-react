import { HStack, Heading, Icon, Text } from '@chakra-ui/react'
import MovieProvider from '../context/movie/MovieProvider'
import useHistoryEventContext from '../context/historyEvent/useHistoryEventContext'
import HeadingRowView from './HeadingRow'
import RewindButtonView from './RewindButtonView'
import { BsCloudUpload } from 'react-icons/bs'
import HistoryImportRowView from './HistoryImportRow'
import { useState } from 'react'
import ExpandButtonView from './ExpandButtonView'

export default function HistoryImportEventView (): JSX.Element {
  const historyEventContextValue = useHistoryEventContext()
  const [open, setOpen] = useState(false)
  if (historyEventContextValue.import == null) {
    return <></>
  }
  const rows = open && historyEventContextValue.import.items.map((item) => {
    return (
      <MovieProvider key={item.id} movie={item} points={0}>
        <HistoryImportRowView />
      </MovieProvider>
    )
  })
  function handleOpenClick (): void {
    setOpen(current => !current)
  }
  return (
    <>
      <HeadingRowView
        borderBottom='1px solid lightgray'
        paddingTop={0}
        paddingBottom={0}
      >
        <HStack>
          <Heading size='xs'>
            {historyEventContextValue.timestamp}
          </Heading>
          <Icon as={BsCloudUpload} />
          <Text>({historyEventContextValue.import.items.length})</Text>
        </HStack>
        <HStack>
          <RewindButtonView />
          <ExpandButtonView open={open} onClick={handleOpenClick} />
        </HStack>
      </HeadingRowView>
      {rows}
    </>
  )
}
