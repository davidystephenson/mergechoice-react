import { RepeatIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import useMovieContext from '../context/movie/useMovieContext'

export default function ResetButton (): JSX.Element {
  const movieContextValue = useMovieContext()
  function handleReset (): void {
    void movieContextValue.reset()
  }
  return (
    <IconButton
      aria-label='reset'
      icon={<RepeatIcon />}
      onClick={handleReset}
      minW='fit-content'
    />
  )
}
