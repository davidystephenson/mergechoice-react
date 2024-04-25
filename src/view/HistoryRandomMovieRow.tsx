import { Text, Td, HStack, Icon } from '@chakra-ui/react'
import MovieLink from './MovieLink'
import useMovieContext from '../context/movie/useMovieContext'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'

export default function HistoryRandomMovieView (): JSX.Element {
  const movieContextValue = useMovieContext()
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
          <Text>{movieContextValue.points}</Text>
          <Icon as={GiPerspectiveDiceSixFacesRandom} />
        </HStack>
      </Td>
    </>
  )
}
