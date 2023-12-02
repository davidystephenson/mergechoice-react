import { HStack, Text } from '@chakra-ui/react'
import MinimumLabelView from './MinimumLabel'
import MaximumLabelView from './MaximumLabel'
import useMoviesContext from '../context/movies/useMoviesContext'
import { CheckIcon } from '@chakra-ui/icons'
import DifferenceLabelView from './DifferenceLabel'

export default function ChoiceCounterLabelView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  if (moviesContextValue.finalized) {
    return <CheckIcon />
  }
  if (moviesContextValue.choiceCount.maximum === 1) {
    return <span>1</span>
  }
  return (
    <HStack gap='3px'>
      <MinimumLabelView />
      <Text>-</Text>
      <MaximumLabelView />
      <DifferenceLabelView />
    </HStack>
  )
}
