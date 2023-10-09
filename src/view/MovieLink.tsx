import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Text } from '@chakra-ui/react'
import Clink from 'clink-react'
import useMovieContext from '../context/movie/useMovieContext'

export default function MovieLink ({ children }: {
  children?: string | string[]
}): JSX.Element {
  const movieContextValue = useMovieContext()
  function handleClick (): void {
    movieContextValue.open()
  }
  return (
    <Clink to={movieContextValue.url} target='_blank' onClick={handleClick}>
      <Text>{children ?? movieContextValue.label} <ExternalLinkIcon /></Text>
    </Clink>
  )
}
