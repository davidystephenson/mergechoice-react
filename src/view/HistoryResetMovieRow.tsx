import { Text, Td, HStack } from '@chakra-ui/react'
import MovieLink from './MovieLink'
import useMovieContext from '../context/movie/useMovieContext'
import useHistoryEventContext from '../context/historyEvent/useHistoryEventContext'
import { RepeatIcon } from '@chakra-ui/icons'

export default function HistoryResetMovieRowView (): JSX.Element {
  const historyEventContextValue = useHistoryEventContext()
  const movieContextValue = useMovieContext()
  if (historyEventContextValue.reset == null) {
    throw new Error('There is no reset choice')
  }
  return (
    <>
      <Td>
        <MovieLink />
      </Td>
      <Td>
        <Text>{movieContextValue.points}</Text>
      </Td>
      <Td>
        <HStack>
          <Text>{movieContextValue.score}</Text>
          <RepeatIcon />
        </HStack>
      </Td>
    </>
  )
}
