import { Icon, HStack, Heading } from '@chakra-ui/react'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import RewindButtonView from './RewindButtonView'
import useEpisodeContext from '../context/historyEvent/useHistoryEventContext'
import EpisodeHeadingRowView from './HistoryEventHeadingRow'

export default function HistoryRandomHeadingRowView (): JSX.Element {
  const episodeContextValue = useEpisodeContext()
  if (episodeContextValue.random == null) {
    throw new Error('There is no random choice.')
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
          <Icon as={GiPerspectiveDiceSixFacesRandom} />
        </HStack>
        <RewindButtonView />
      </EpisodeHeadingRowView>
    </>
  )
}
