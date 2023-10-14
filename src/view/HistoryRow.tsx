import { Text, Tr, Td } from '@chakra-ui/react'
import MovieLink from './MovieLink'
import useMovieContext from '../context/movie/useMovieContext'
import useHistoryEventContext from '../context/historyEvent/useHistoryEventContext'
import { CheckIcon, SmallCloseIcon } from '@chakra-ui/icons'

export default function HistoryRowView (): JSX.Element {
  const historyEventContextValue = useHistoryEventContext()
  const movieContextValue = useMovieContext()
  const a = historyEventContextValue.aId === movieContextValue.id
  const better = a ? historyEventContextValue.aBetter : !historyEventContextValue.aBetter
  const betterStyles = better ? { fontWeight: 'bold' } : {}
  const aScoreBetter = historyEventContextValue.aItem.score > historyEventContextValue.bItem.score
  const upset = a ? better !== aScoreBetter : better === aScoreBetter
  const upsetItem = upset && better
  const upsetStyles = upsetItem ? { fontWeight: 'bold' } : {}
  const iconView = better ? <CheckIcon /> : <SmallCloseIcon />
  return (
    <Tr>
      <Td>
        <MovieLink {...betterStyles} />
      </Td>
      <Td>
        <Text {...upsetStyles}>{movieContextValue.points}</Text>
      </Td>
      <Td>
        <Text {...upsetStyles}>{movieContextValue.score}</Text>
      </Td>
      <Td textAlign='center'>
        {iconView}
      </Td>
    </Tr>
  )
}
