import { Text, TableCellProps, Td, HStack } from '@chakra-ui/react'
import useMovieContext from '../context/movie/useMovieContext'
import MovieLink from './MovieLink'
import DeleteButton from './DeleteButton'

export default function MovieListRow ({ endAdornment }: {
  cellProps?: TableCellProps
  endAdornment?: JSX.Element
}): JSX.Element {
  const movieContextValue = useMovieContext()
  const end = endAdornment ?? (
    <DeleteButton />
  )
  return (
    <>
      <Td><MovieLink /></Td>
      <Td>
        <Text>{movieContextValue.score}</Text>
      </Td>
      <Td>
        <HStack>
          <Text>{movieContextValue.points}</Text>
          {end}
        </HStack>
      </Td>
    </>
  )
}
