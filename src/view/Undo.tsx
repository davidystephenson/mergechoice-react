import { Button } from '@chakra-ui/react'
import useMoviesContext from '../context/movies/useMoviesContext'

export default function UndoView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  const latestHistory = moviesContextValue.state.history[0]
  if (latestHistory?.choice == null) {
    return <></>
  }
  function handleUndo (): void {
    moviesContextValue.undo()
  }
  return (
    <Button onClick={handleUndo}>Undo</Button>
  )
}
