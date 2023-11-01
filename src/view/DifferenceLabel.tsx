import useMoviesContext from '../context/movies/useMoviesContext'

export default function DifferenceLabelView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  if (moviesContextValue.random) {
    return <></>
  }
  if (moviesContextValue.choiceCount.maximum === moviesContextValue.choiceCount.minimum) {
    return <></>
  }
  const difference = moviesContextValue.choiceCount.maximum - moviesContextValue.choiceCount.minimum
  return <span>({difference})</span>
}
