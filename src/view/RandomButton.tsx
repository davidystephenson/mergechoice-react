import { Button } from '@chakra-ui/react'
import useMoviesContext from '../context/movies/useMoviesContext'
import { useHotkeys } from 'react-hotkeys-hook'

export default function RandomButtonView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  useHotkeys('r', moviesContextValue.createRandomMovieChoice)
  if (!moviesContextValue.finalized) {
    return <></>
  }
  function handleClick (): void {
    moviesContextValue.createRandomMovieChoice()
  }
  return (
    <Button variant='solid' size='xs' fontSize='sm' onClick={handleClick}>
      [r]andom
    </Button>
  )
}
