import { Button, HStack, Icon, Text } from '@chakra-ui/react'
import useMoviesContext from '../context/movies/useMoviesContext'
import { useHotkeys } from 'react-hotkeys-hook'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'

export default function RandomButtonView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  useHotkeys('r', moviesContextValue.createRandomMovieChoice)
  if (!moviesContextValue.complete) {
    return <></>
  }
  function handleClick (): void {
    moviesContextValue.createRandomMovieChoice()
  }
  return (
    <Button variant='solid' size='xs' fontSize='sm' onClick={handleClick}>
      <HStack>
        <Text>[r]andom</Text>
        <Icon as={GiPerspectiveDiceSixFacesRandom} />
      </HStack>
    </Button>
  )
}
