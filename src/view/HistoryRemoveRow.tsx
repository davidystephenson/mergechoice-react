import { Text, Tr, Td } from '@chakra-ui/react'
import MovieLink from './MovieLink'
import useMovieContext from '../context/movie/useMovieContext'
import useHistoryEventContext from '../context/historyEvent/useHistoryEventContext'
import { DeleteIcon } from '@chakra-ui/icons'

export default function HistoryRemoveRowView (): JSX.Element {
  const historyEventContextValue = useHistoryEventContext()
  const movieContextValue = useMovieContext()
  if (historyEventContextValue.remove == null) {
    return <></>
  }
  return (
    <Tr>
      <Td>
        <MovieLink />
      </Td>
      <Td>
        <Text>{movieContextValue.points}</Text>
      </Td>
      <Td>
        <Text>{movieContextValue.score}</Text>
      </Td>
      <Td textAlign='center'>
        <DeleteIcon />
      </Td>
    </Tr>
  )
}
