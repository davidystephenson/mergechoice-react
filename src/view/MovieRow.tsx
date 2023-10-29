import { HStack, IconButton, Text, TableCellProps, Td } from '@chakra-ui/react'
import useMovieContext from '../context/movie/useMovieContext'
import MovieLink from './MovieLink'
import { DeleteIcon } from '@chakra-ui/icons'

export default function MovieRow ({ endAdornment }: {
  cellProps?: TableCellProps
  endAdornment?: JSX.Element
}): JSX.Element {
  const movieContextValue = useMovieContext()
  function handleDelete (): void {
    void movieContextValue.remove()
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
    <>
      <Td><MovieLink /></Td>
      <Td>
        <Text>{movieContextValue.points}</Text>
      </Td>
      <Td>
        <HStack alignItems='center' justifyContent='space-between'>
          <Text>{movieContextValue.score}</Text>
          {end}
        </HStack>
      </Td>
    </>
  )
}
