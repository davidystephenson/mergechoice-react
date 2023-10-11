import { Text, Tr, Td } from '@chakra-ui/react'
import MovieLink from './MovieLink'
import useMovieContext from '../context/movie/useMovieContext'
import useHistoryEventContext from '../context/historyEvent/useHistoryEventContext'
import { CheckIcon, SmallCloseIcon } from '@chakra-ui/icons'

export default function HistoryRowView (): JSX.Element {
  const historyEventContextValue = useHistoryEventContext()
  const movieContextValue = useMovieContext()
  const isA = historyEventContextValue.aId === movieContextValue.id
  const isBetter = isA ? historyEventContextValue.aBetter : !historyEventContextValue.aBetter
  const iconView = isBetter ? <CheckIcon /> : <SmallCloseIcon />
  return (
    <Tr>
      <Td>
        <MovieLink />
      </Td>
      <Td>
        {movieContextValue.points}
      </Td>
      <Td>
        <Text>{movieContextValue.score}</Text>
      </Td>
      <Td textAlign='center'>
        {iconView}
      </Td>
    </Tr>
  )
}
