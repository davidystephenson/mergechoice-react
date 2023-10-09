import { Badge, HStack } from '@chakra-ui/react'
import MovieLink from './MovieLink'
import useMovieContext from '../context/movie/useMovieContext'

export default function ReviewMovieView (): JSX.Element {
  const movieContextValue = useMovieContext()
  return (
    <HStack>
      <MovieLink />
      <Badge>Points: {movieContextValue.points}</Badge>
      <Badge>Score: {movieContextValue.score}</Badge>
    </HStack>
  )
}
