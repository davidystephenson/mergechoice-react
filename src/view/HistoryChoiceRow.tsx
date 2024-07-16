import { Text, Td, HStack } from '@chakra-ui/react'
import MovieLink from './MovieLink'
import useMovieContext from '../context/movie/useMovieContext'
import useEpisodeContext from '../context/historyEvent/useHistoryEventContext'
import { CheckIcon, SmallCloseIcon } from '@chakra-ui/icons'

export default function HistoryChoiceRowView (): JSX.Element {
  const episodeContextValue = useEpisodeContext()
  const movieContextValue = useMovieContext()
  if (episodeContextValue.choice == null) {
    throw new Error('There is no choice.')
  }
  const a = episodeContextValue.choice.aId === movieContextValue.id
  const better = a ? episodeContextValue.choice.aBetter : !episodeContextValue.choice.aBetter
  const betterStyles = better ? { fontWeight: 'bold' } : {}
  const aSeedBetter = episodeContextValue.choice.aItem.seed > episodeContextValue.choice.bItem.seed
  const upset = a ? better !== aSeedBetter : better === aSeedBetter
  const upsetItem = upset && better
  const upsetStyles = upsetItem ? { fontWeight: 'bold' } : {}
  const iconView = better ? <CheckIcon /> : <SmallCloseIcon />
  return (
    <>
      <Td>
        <MovieLink {...betterStyles} />
      </Td>
      <Td>
        <Text {...upsetStyles}>{movieContextValue.seed}</Text>
      </Td>
      <Td>
        <HStack>
          <Text {...upsetStyles}>{movieContextValue.points}</Text>
          {iconView}
        </HStack>
      </Td>
    </>
  )
}
