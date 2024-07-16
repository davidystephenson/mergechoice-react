import { HStack, Heading, Icon, Text } from '@chakra-ui/react'
import { BsCloudUpload } from 'react-icons/bs'
import ExpandButtonView from './ExpandButtonView'
import HeadingRowView from './HeadingRow'
import RewindButtonView from './RewindButtonView'
import useEpisodeContext from '../context/historyEvent/useHistoryEventContext'
import useHistoryContext from '../context/history/useHistoryContext'
import useMoviesContext from '../context/movies/useMoviesContext'
import isResult from '../service/movies/isResult'

export default function HistoryImportHeadingView (): JSX.Element {
  const historyContextValue = useHistoryContext()
  const episodeContextValue = useEpisodeContext()
  const moviesContextValue = useMoviesContext()
  if (episodeContextValue.import == null) {
    throw new Error('There is no import.')
  }
  const open = historyContextValue.openIds.includes(episodeContextValue.mergeChoiceId)
  function handleOpenClick (): void {
    historyContextValue.toggleEpisode(episodeContextValue.mergeChoiceId)
  }
  const matches = episodeContextValue.import.items.filter(item => {
    return isResult({ movie: item, query: moviesContextValue.query })
  })
  return (
    <HeadingRowView
      borderBottom='1px solid lightgray'
      paddingTop={0}
      paddingBottom={0}
    >
      <HStack>
        <Heading size='xs'>
          {episodeContextValue.timestamp}
        </Heading>
        <Icon as={BsCloudUpload} />
        <Text>({matches.length})</Text>
      </HStack>
      <HStack>
        <RewindButtonView />
        <ExpandButtonView open={open} onClick={handleOpenClick} />
      </HStack>
    </HeadingRowView>
  )
}
