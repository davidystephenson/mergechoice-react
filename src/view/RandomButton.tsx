import { Button } from '@chakra-ui/react'
import useMoviesContext from '../context/movies/useMoviesContext'

export default function RandomButtonView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  function handleClick (): void {
    moviesContextValue.createRandomMovieChoice()
  }
  return (
    <Button variant='solid' size='xs' fontSize='sm' onClick={handleClick}>
      Random
    </Button>
  )
}
