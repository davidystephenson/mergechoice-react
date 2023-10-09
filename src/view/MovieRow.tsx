import { Td, Tr } from '@chakra-ui/react'
import useMovieContext from '../context/movie/useMovieContext'
import MovieLink from './MovieLink'

export default function MovieRow (): JSX.Element {
  const movieContextValue = useMovieContext()
  return (
    <Tr>
      <Td><MovieLink /></Td>
      <Td>{movieContextValue.points}</Td>
      <Td>{movieContextValue.score}</Td>
    </Tr>
  )
}
