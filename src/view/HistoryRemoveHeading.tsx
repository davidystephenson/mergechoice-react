import { DeleteIcon } from '@chakra-ui/icons'
import { HStack, Heading } from '@chakra-ui/react'
import EpisodeHeadingRowView from './HistoryEventHeadingRow'
import RewindButtonView from './RewindButtonView'
import useEpisodeContext from '../context/historyEvent/useHistoryEventContext'

export default function HistoryRemoveHeadingView (): JSX.Element {
  const episodeContextValue = useEpisodeContext()
  return (
    <EpisodeHeadingRowView>
      <HStack>
        <Heading size='xs'>
          {episodeContextValue.timestamp}
        </Heading>
        <DeleteIcon />
      </HStack>
      <RewindButtonView />
    </EpisodeHeadingRowView>
  )
}
