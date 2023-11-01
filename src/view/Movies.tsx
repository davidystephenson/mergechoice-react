import HistoryProvider from '../context/history/HistoryProvider'
import ChoiceView from './Choice'
import MovieTableView from './MovieTable'

export default function MoviesView (): JSX.Element {
  return (
    <>
      <ChoiceView />
      <HistoryProvider>
        <MovieTableView />
      </HistoryProvider>
    </>
  )
}
