import { HStack, IconButton, Td, Text, Tr, TableRowProps, TableCellProps } from '@chakra-ui/react'
import useMovieContext from '../context/movie/useMovieContext'
import MovieLink from './MovieLink'
import { DeleteIcon } from '@chakra-ui/icons'

export default function MovieRow ({ cellProps, endAdornment, ...restProps }: {
  cellProps?: TableCellProps
  endAdornment?: JSX.Element
} & TableRowProps): JSX.Element {
  const movieContextValue = useMovieContext()
  function handleDelete (): void {
    movieContextValue.remove()
  }
  const end = endAdornment ?? (
    <IconButton
      aria-label='delete'
      icon={<DeleteIcon />}
      onClick={handleDelete}
      minW='fit-content'
    />
  )
  return (
    <Tr {...restProps}>
      <Td {...cellProps}><MovieLink /></Td>
      <Td {...cellProps}>
        <Text>{movieContextValue.points}</Text>
      </Td>
      <Td colSpan={2} {...cellProps}>
        <HStack alignItems='center' justifyContent='space-between'>
          <Text>{movieContextValue.score}</Text>
          {end}
        </HStack>
      </Td>
    </Tr>
  )
}
