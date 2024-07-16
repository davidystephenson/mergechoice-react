import { Text, Td, HStack } from '@chakra-ui/react'
import MovieLink from './MovieLink'
import useMovieContext from '../context/movie/useMovieContext'
import useEpisodeContext from '../context/episode/useEpisodeContext'
import { RepeatIcon } from '@chakra-ui/icons'

export default function HistoryResetMovieRowView (): JSX.Element {
  const episodeContextValue = useEpisodeContext()
  const movieContextValue = useMovieContext()
  if (episodeContextValue.reset == null) {
    throw new Error('There is no reset choice')
  }
  return (
    <>
      <Td>
        <MovieLink />
      </Td>
      <Td>
        <Text>{movieContextValue.points}</Text>
      </Td>
      <Td>
        <HStack>
          <Text>{movieContextValue.seed}</Text>
          <RepeatIcon />
        </HStack>
      </Td>
    </>
  )
}
