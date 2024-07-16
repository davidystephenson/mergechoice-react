import { LockIcon } from '@chakra-ui/icons'
import EpisodeHeadingRowView from './HistoryEventHeadingRow'
import RewindButtonView from './RewindButtonView'
import useEpisodeContext from '../context/historyEvent/useHistoryEventContext'
import { HStack, Heading } from '@chakra-ui/react'

export default function HistoryArchiveHeadingView (): JSX.Element {
  const episodeContextValue = useEpisodeContext()
  if (episodeContextValue.archive == null) {
    throw new Error('There is no archive.')
  }
  return (
    <EpisodeHeadingRowView>
      <HStack>
        <Heading size='xs'>
          {episodeContextValue.timestamp}
        </Heading>
        <LockIcon />
      </HStack>
      <RewindButtonView />
    </EpisodeHeadingRowView>
  )
}
