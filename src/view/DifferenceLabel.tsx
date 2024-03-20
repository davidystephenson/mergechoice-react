import useMoviesContext from '../context/movies/useMoviesContext'
import comparePercent from '../service/movies/comparePercent'

export default function DifferenceLabelView (): JSX.Element {
  const movies = useMoviesContext()
  if (movies.random) {
    return <></>
  }
  if (movies.choiceCountRange.maximum === movies.choiceCountRange.minimum) {
    return <></>
  }
  const difference = movies.choiceCountRange.maximum - movies.choiceCountRange.minimum
  const minimumComparison = comparePercent({
    maximum: movies.choiceCountRange.maximum,
    minimum: movies.choiceCountRange.minimum,
    target: movies.choiceCountRange.minimum
  })
  const maximumComparison = comparePercent({
    maximum: movies.choiceCountRange.maximum,
    minimum: movies.choiceCountRange.minimum,
    target: movies.choiceCountRange.maximum
  })
  return <span>({difference}, {minimumComparison}%, {maximumComparison}%)</span>
}
