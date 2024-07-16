import { Text, Td, HStack } from '@chakra-ui/react'
import MovieLink from './MovieLink'
import useMovieContext from '../context/movie/useMovieContext'
import useEpisodeContext from '../context/episode/useEpisodeContext'
import { LockIcon } from '@chakra-ui/icons'

export default function HistoryArchiveRowView (): JSX.Element {
  const episodeContextValue = useEpisodeContext()
  const movieContextValue = useMovieContext()
  if (episodeContextValue.archive == null) {
    return <></>
  }
  return (
    <>
      <Td>
        <MovieLink />
      </Td>
      <Td>
        <Text>{movieContextValue.seed}</Text>
      </Td>
      <Td>
        <HStack>
          <LockIcon />
        </HStack>
      </Td>
    </>
  )
}
