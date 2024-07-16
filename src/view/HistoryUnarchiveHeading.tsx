import { UnlockIcon } from '@chakra-ui/icons'
import EpisodeHeadingRowView from './HistoryEventHeadingRow'
import RewindButtonView from './RewindButtonView'
import useEpisodeContext from '../context/historyEvent/useHistoryEventContext'
import { HStack, Heading } from '@chakra-ui/react'

export default function HistoryUnarchiveHeadingView (): JSX.Element {
  const episodeContextValue = useEpisodeContext()
  if (episodeContextValue.unarchive == null) {
    throw new Error('There is no unarchive.')
  }
  return (
    <EpisodeHeadingRowView>
      <HStack>
        <Heading size='xs'>
          {episodeContextValue.timestamp}
        </Heading>
        <UnlockIcon />
      </HStack>
      <RewindButtonView />
    </EpisodeHeadingRowView>
  )
}
