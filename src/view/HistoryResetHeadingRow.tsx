import { HStack, Heading } from '@chakra-ui/react'
import RewindButtonView from './RewindButtonView'
import useEpisodeContext from '../context/episode/useEpisodeContext'
import EpisodeHeadingRowView from './EpisodeHeadingRow'
import { RepeatIcon } from '@chakra-ui/icons'

export default function HistoryResetHeadingRowView (): JSX.Element {
  const episodeContextValue = useEpisodeContext()
  if (episodeContextValue.reset == null) {
    throw new Error('There is no reset choice.')
  }
  return (
    <>
      <EpisodeHeadingRowView
        borderBottom='1px solid lightgray'
        paddingTop={0}
        paddingBottom={0}
      >
        <HStack>
          <Heading size='xs'>
            {episodeContextValue.timestamp}
          </Heading>
          <RepeatIcon />
        </HStack>
        <RewindButtonView />
      </EpisodeHeadingRowView>
    </>
  )
}
