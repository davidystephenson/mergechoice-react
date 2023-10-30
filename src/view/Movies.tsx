import HistoryProvider from '../context/history/HistoryProvider'
import MovieTableView from './MovieTable'
import ChoiceView from './Choice'

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
