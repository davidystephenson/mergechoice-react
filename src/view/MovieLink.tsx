import { ExternalLinkIcon } from '@chakra-ui/icons'
import { HStack, Text } from '@chakra-ui/react'
import Clink from 'clink-react'
import useMovieContext from '../context/movie/useMovieContext'

export default function MovieLink (): JSX.Element {
  const movieContextValue = useMovieContext()
  function handleClick (): void {
    movieContextValue.open()
  }
  return (
    <Clink to={movieContextValue.url} target='_blank' onClick={handleClick}>
      <HStack alignItems='baseline'>
        <Text>{movieContextValue.imdbId}</Text>
        <ExternalLinkIcon />
      </HStack>
    </Clink>
  )
}
