import { Stack } from '@chakra-ui/react'
import useMoviesContext from '../context/movies/useMoviesContext'

export default function ReviewView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  if (moviesContextValue.review == null) {
    return <></>
  }
  return (
    <Stack direction='row' />
  )
}
