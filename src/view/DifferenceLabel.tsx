import useMoviesContext from '../context/movies/useMoviesContext'
import comparePercent from '../service/movies/comparePercent'

export default function DifferenceLabelView (): JSX.Element {
  const movies = useMoviesContext()
  if (movies.random) {
    return <></>
  }
  if (movies.choiceCount.maximum === movies.choiceCount.minimum) {
    return <></>
  }
  const difference = movies.choiceCount.maximum - movies.choiceCount.minimum
  const minimumComparison = comparePercent({
    maximum: movies.choiceCount.maximum,
    minimum: movies.choiceCount.minimum,
    target: movies.choiceCount.minimum
  })
  const maximumComparison = comparePercent({
    maximum: movies.choiceCount.maximum,
    minimum: movies.choiceCount.minimum,
    target: movies.choiceCount.maximum
  })
  return <span>({difference}, {minimumComparison}%, {maximumComparison}%)</span>
}
