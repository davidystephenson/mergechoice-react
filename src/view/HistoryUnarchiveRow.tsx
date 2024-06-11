import { Text, Td, HStack } from '@chakra-ui/react'
import MovieLink from './MovieLink'
import useMovieContext from '../context/movie/useMovieContext'
import useHistoryEventContext from '../context/historyEvent/useHistoryEventContext'
import { UnlockIcon } from '@chakra-ui/icons'

export default function HistoryUnarchiveRowView (): JSX.Element {
  const historyEventContextValue = useHistoryEventContext()
  const movieContextValue = useMovieContext()
  if (historyEventContextValue.unarchive == null) {
    return <></>
  }
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
          <UnlockIcon />
        </HStack>
      </Td>
    </>
  )
}
