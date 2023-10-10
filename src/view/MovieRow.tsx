import { HStack, IconButton, Td, Text, Tr, TableRowProps, TableCellProps } from '@chakra-ui/react'
import useMovieContext from '../context/movie/useMovieContext'
import MovieLink from './MovieLink'
import { DeleteIcon } from '@chakra-ui/icons'

export default function MovieRow ({ cellProps, ...restProps }: {
  cellProps?: TableCellProps
} & TableRowProps): JSX.Element {
  const movieContextValue = useMovieContext()
  function handleDelete (): void {
    movieContextValue.remove()
  }
  return (
    <Tr {...restProps}>
      <Td {...cellProps}><MovieLink /></Td>
      <Td {...cellProps}>
        <Text>{movieContextValue.points}</Text>
      </Td>
      <Td {...cellProps}>
        <HStack alignItems='center'>
          <Text>{movieContextValue.score}</Text>
          <IconButton aria-label='delete' icon={<DeleteIcon />} onClick={handleDelete} />
        </HStack>
      </Td>
    </Tr>
  )
}
