import { DeleteIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import useMovieContext from '../context/movie/useMovieContext'

export default function DeleteButton (): JSX.Element {
  const movieContextValue = useMovieContext()
  function handleDelete (): void {
    void movieContextValue.remove()
  }
  return (
    <IconButton
      aria-label='delete'
      colorScheme='red'
      icon={<DeleteIcon />}
      onClick={handleDelete}
    />
  )
}
