import { Heading, Td, Tr } from '@chakra-ui/react'
import useMoviesContext from '../context/movies/useMoviesContext'
import MovieProvider from '../context/movie/MovieProvider'
import findById from '../service/findById'
import MovieRow from './MovieRow'

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
    <>
      <MovieProvider movie={betterMovie}>
        <MovieRow />
      </MovieProvider>
      <Tr>
        <Td colSpan={3} textAlign='center'>
          <Heading size='sm'>&gt;</Heading>
        </Td>
      </Tr>
      <MovieProvider movie={worseMovie}>
        <MovieRow />
      </MovieProvider>
    </>
  )
}
