import { Text } from '@chakra-ui/react'
import useMoviesContext from '../context/movies/useMoviesContext'

export default function ChoiceCounterDetailsView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  if (moviesContextValue.complete) {
    return <>Your list is sorted!</>
  }
  if (moviesContextValue.random) {
    return (
      <>
        <Text>You have to make at least 1 choice.</Text>
        <Text>The maximum number of choices comes from the random choice.</Text>
      </>
    )
  }
  if (moviesContextValue.choiceCountRange.maximum === 1) {
    return <>You have 1 more choice.</>
  }
  return (
    <>
      <Text>You have at least {moviesContextValue.choiceCountRange.minimum} more choices.</Text>
      <Text>You have at most {moviesContextValue.choiceCountRange.maximum} more choices.</Text>
    </>
  )
}
