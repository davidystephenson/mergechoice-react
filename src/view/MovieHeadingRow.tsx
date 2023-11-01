import { Heading } from '@chakra-ui/react'
import HeadingRowView from './HeadingRow'
import ImportButtonView from './ImportButton'
import RandomButtonView from './RandomButton'
import useMoviesContext from '../context/movies/useMoviesContext'

export default function MovieHeadingRowView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  return (
    <HeadingRowView>
      <Heading size='sm'>Movies ({moviesContextValue.resultMovies.length})</Heading>
      <RandomButtonView />
      <ImportButtonView />
    </HeadingRowView>
  )
}
