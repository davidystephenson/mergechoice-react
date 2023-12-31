import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Text } from '@chakra-ui/react'
import Clink, { ClinkProps } from 'clink-react'
import useMovieContext from '../context/movie/useMovieContext'

export default function MovieLink ({ children, ...restProps }: {
  children?: string | string[]
} & Omit<ClinkProps, 'to'>): JSX.Element {
  const movieContextValue = useMovieContext()
  function handleClick (): void {
    movieContextValue.open()
  }
  return (
    <Clink to={movieContextValue.url} target='_blank' onClick={handleClick} {...restProps}>
      <Text>{children ?? movieContextValue.label} <ExternalLinkIcon /></Text>
    </Clink>
  )
}
