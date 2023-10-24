import { HStack, Text } from '@chakra-ui/react'
import MinimumLabelView from './MinimumLabel'
import MaximumLabel from './MaximumLabel'
import useMoviesContext from '../context/movies/useMoviesContext'
import { CheckIcon } from '@chakra-ui/icons'

export default function ChoiceCounterLabelView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  if (moviesContextValue.finalized) {
    return <CheckIcon />
  }
  if (moviesContextValue.maximumCount === 1) {
    return <span>{moviesContextValue.maximumCount}</span>
  }
  return (
    <HStack>
      <MinimumLabelView />
      <Text>-</Text>
      <MaximumLabel />
    </HStack>
  )
}
