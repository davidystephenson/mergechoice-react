import { Icon, HStack, Heading } from '@chakra-ui/react'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import RewindButtonView from './RewindButtonView'
import useEpisodeContext from '../context/episode/useEpisodeContext'
import EpisodeHeadingRowView from './EpisodeHeadingRow'

export default function HistoryChoiceHeadingRowView (): JSX.Element {
  const episodeContextValue = useEpisodeContext()
  if (episodeContextValue.choice == null) {
    throw new Error('There is no choice.')
  }
  const randomIcon = episodeContextValue.choice.random && (
    <Icon as={GiPerspectiveDiceSixFacesRandom} />
  )
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
          {randomIcon}
        </HStack>
        <RewindButtonView />
      </EpisodeHeadingRowView>
    </>
  )
}
