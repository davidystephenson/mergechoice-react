import { Button, HStack, Icon, Text } from '@chakra-ui/react'
import useMoviesContext from '../context/movies/useMoviesContext'
import getTotalSteps from '../service/getTotalSteps'
import getOperations from '../service/getOperations'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'

export default function ChoiceCounterView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  const activeTotal = getTotalSteps({
    items: moviesContextValue.activeItems,
    operations: moviesContextValue.activeOperations
  })
  const betterTotal = getTotalSteps({
    items: moviesContextValue.betterItems,
    operations: moviesContextValue.betterOperations
  })
  const worseTotal = getTotalSteps({
    items: moviesContextValue.worseItems,
    operations: moviesContextValue.worseOperations
  })
  const reserveOperations = moviesContextValue.reserveItems.map(item => {
    return {
      input: [[], []],
      output: [item.id]
    }
  })
  const newReserveOperations = getOperations({
    activeOperations: reserveOperations
  })
  const activePostOperation = {
    input: [[], []],
    output: moviesContextValue.activeItems.map(item => item.id)
  }
  const betterPostOperation = {
    input: [[], []],
    output: moviesContextValue.betterItems.map(item => item.id)
  }
  const worsePostOperation = {
    input: [[], []],
    output: moviesContextValue.worseItems.map(item => item.id)
  }
  const reserveTotal = getTotalSteps({
    items: [...moviesContextValue.activeItems, ...moviesContextValue.betterItems, ...moviesContextValue.reserveItems, ...moviesContextValue.worseItems],
    operations: [
      ...newReserveOperations,
      activePostOperation,
      betterPostOperation,
      worsePostOperation
    ]
  })
  const minimumTotal = activeTotal.minimum + betterTotal.minimum + worseTotal.minimum + reserveTotal.minimum
  const maximumTotal = activeTotal.maximum + betterTotal.maximum + worseTotal.maximum + reserveTotal.maximum
  const random = moviesContextValue.state.choice?.random === true
  const minimum = random ? <Text>1</Text> : <Text>{minimumTotal}</Text>
  const maximum = random ? <Icon as={GiPerspectiveDiceSixFacesRandom} /> : <Text>{maximumTotal}</Text>
  return (
    <Button variant='solid'>
      <HStack spacing='0'>{minimum}<Text>-</Text>{maximum}</HStack>
    </Button>
  )
}
