import { Button, HStack, Icon, Text } from '@chakra-ui/react'
import useMoviesContext from '../context/movies/useMoviesContext'
import { useHotkeys } from 'react-hotkeys-hook'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'

export default function RandomButtonView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  function handleRandom (): void {
    void moviesContextValue.createRandomMovieChoice()
  }
  useHotkeys('r', handleRandom)
  if (!moviesContextValue.complete) {
    return <></>
  }
  const items = Object.values(moviesContextValue.items)
  if (items.length < 2) {
    throw new Error('There must be at least two active items to create a random choice')
  }
  return (
    <Button variant='solid' size='xs' fontSize='sm' onClick={handleRandom}>
      <HStack>
        <Text>[r]andom</Text>
        <Icon as={GiPerspectiveDiceSixFacesRandom} />
      </HStack>
    </Button>
  )
}
