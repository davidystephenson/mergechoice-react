import { Text, Td, HStack } from '@chakra-ui/react'
import MovieLink from './MovieLink'
import useMovieContext from '../context/movie/useMovieContext'
import useEpisodeContext from '../context/historyEvent/useHistoryEventContext'
import { DeleteIcon } from '@chakra-ui/icons'

export default function HistoryRemoveRowView (): JSX.Element {
  const episodeContextValue = useEpisodeContext()
  const movieContextValue = useMovieContext()
  if (episodeContextValue.remove == null) {
    return <></>
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
          <DeleteIcon />
        </HStack>
      </Td>
    </>
  )
}
