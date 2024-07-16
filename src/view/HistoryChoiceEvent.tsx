import useEpisodeContext from '../context/historyEvent/useHistoryEventContext'
import HistoryChoiceHeadingRowView from './HistoryChoiceHeadingRow'
import HistoryChoiceARowView from './HistoryChoiceARow'
import HistoryChoiceBRowView from './HistoryChoiceBRow'

export default function HistoryChoiceEventView (): JSX.Element {
  const episodeContextValue = useEpisodeContext()
  if (episodeContextValue.choice == null) {
    throw new Error('There is no choice.')
  }
  return (
    <>
      <HistoryChoiceHeadingRowView />
      <HistoryChoiceARowView />
      <HistoryChoiceBRowView />
    </>
  )
}
