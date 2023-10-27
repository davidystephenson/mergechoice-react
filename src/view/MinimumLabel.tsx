import useMoviesContext from '../context/movies/useMoviesContext'

export default function MinimumLabelView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  if (moviesContextValue.random) {
    return <span>1</span>
  }
  return <span>{moviesContextValue.choiceCount.minimum}</span>
}
