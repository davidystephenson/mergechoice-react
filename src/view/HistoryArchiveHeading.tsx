import { LockIcon } from '@chakra-ui/icons'
import EpisodeHeadingRowView from './EpisodeHeadingRow'
import RewindButtonView from './RewindButtonView'
import useEpisodeContext from '../context/episode/useEpisodeContext'
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
