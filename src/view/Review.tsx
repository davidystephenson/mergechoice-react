import { Alert, Heading, VStack } from '@chakra-ui/react'
import useMoviesContext from '../context/movies/useMoviesContext'
import MovieProvider from '../context/movie/MovieProvider'
import findById from '../service/findById'
import ReviewMovieView from './ReviewMovie'

export default function ReviewView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  if (moviesContextValue.review == null) {
    return <></>
  }
  const betterMovie = findById({
    items: moviesContextValue.items,
    id: moviesContextValue.review.betterId
  })
  if (betterMovie == null) {
    throw new Error('There is no better movie.')
  }
  const worseMovie = findById({
    items: moviesContextValue.items,
    id: moviesContextValue.review.worseId
  })
  if (worseMovie == null) {
    throw new Error('There is no worse movie.')
  }
  return (
    <Alert status='info' justifyContent='center'>
      <VStack>
        <MovieProvider movie={betterMovie}>
          <ReviewMovieView />
        </MovieProvider>
        <Heading size='md'>&gt;</Heading>
        <MovieProvider movie={worseMovie}>
          <ReviewMovieView />
        </MovieProvider>
      </VStack>
    </Alert>
  )
}
