import { Text, Td, HStack } from '@chakra-ui/react'
import MovieLink from './MovieLink'
import useMovieContext from '../context/movie/useMovieContext'
import useHistoryEventContext from '../context/historyEvent/useHistoryEventContext'
import { LockIcon } from '@chakra-ui/icons'

export default function HistoryArchiveRowView (): JSX.Element {
  const historyEventContextValue = useHistoryEventContext()
  const movieContextValue = useMovieContext()
  if (historyEventContextValue.archive == null) {
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
          <LockIcon />
        </HStack>
      </Td>
    </>
  )
}
