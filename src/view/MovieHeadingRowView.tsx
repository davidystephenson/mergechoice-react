import { Heading } from '@chakra-ui/react'
import HeadingRowView from './HeadingRow'
import ImportButtonView from './ImportButton'
import RandomButtonView from './RandomButton'
import useMoviesContext from '../context/movies/useMoviesContext'

export default function MovieHeadingRowView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  const countView = moviesContextValue.activeItems.length > 0 && (
    <>({moviesContextValue.activeItems.length})</>
  )
  return (
    <HeadingRowView>
      <Heading size='sm'>Movies {countView}</Heading>
      <RandomButtonView />
      <ImportButtonView />
    </HeadingRowView>
  )
}
