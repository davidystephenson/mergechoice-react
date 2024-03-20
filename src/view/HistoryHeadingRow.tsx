import { Heading } from '@chakra-ui/react'
import HeadingRowView from './HeadingRow'
import HistoryButtonView from './HistoryButton'
import useHistoryContext from '../context/history/useHistoryContext'
import useMoviesContext from '../context/movies/useMoviesContext'

export default function HistoryHeadingRowView (): JSX.Element {
  const history = useHistoryContext()
  const movies = useMoviesContext()
  function handleClick (): void {
    history.toggleExpanded()
  }
  const minimumTotal = movies.choiceCountRange.minimum + history.resultEvents.length
  const maximumTotal = movies.choiceCountRange.maximum + history.resultEvents.length
  const minimumRatio = history.resultEvents.length / minimumTotal
  const maximumRatio = history.resultEvents.length / maximumTotal
  const minimumPercent = Math.round(minimumRatio * 100)
  const maximumPercent = Math.round(maximumRatio * 100)
  return (
    <HeadingRowView onClick={handleClick} cursor='pointer'>
      <Heading size='sm'>History ({history.resultEvents.length}, {minimumPercent}%, {maximumPercent}%)</Heading>
      <HistoryButtonView />
    </HeadingRowView>
  )
}
