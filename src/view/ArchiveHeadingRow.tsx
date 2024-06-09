import { Heading } from '@chakra-ui/react'
import useMoviesContext from '../context/movies/useMoviesContext'
import HeadingRowView from './HeadingRow'

export default function ArchiveHeadingRowView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  const length = Object.keys(moviesContextValue.resultMovies).length
  return (
    <HeadingRowView>
      <Heading size='sm'>Archive ({length})</Heading>
    </HeadingRowView>
  )
}
