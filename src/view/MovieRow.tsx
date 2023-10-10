import { HStack, IconButton, Td, Text, Tr } from '@chakra-ui/react'
import useMovieContext from '../context/movie/useMovieContext'
import MovieLink from './MovieLink'
import { DeleteIcon } from '@chakra-ui/icons'

export default function MovieRow (): JSX.Element {
  const movieContextValue = useMovieContext()
  function handleDelete (): void {
    movieContextValue.remove()
  }
  return (
    <Tr>
      <Td><MovieLink /></Td>
      <Td>{movieContextValue.points}</Td>
      <Td>
        <HStack alignItems='center'>
          <Text>{movieContextValue.score}</Text>
          <IconButton aria-label='delete' icon={<DeleteIcon />} onClick={handleDelete} />
        </HStack>
      </Td>
    </Tr>
  )
}
