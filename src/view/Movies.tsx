import { HStack, Table, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import OptionView from './Option'
import DeferView from './Defer'
import compareMovies from '../service/compareMovies'
import useMoviesContext from '../context/movies/useMoviesContext'
import OptionProvider from '../context/option/OptionProvider'
import ReviewView from './Review'
import MovieProvider from '../context/movie/MovieProvider'
import MovieRow from './MovieRow'
import ImportButtonView from './ImportButton'

export default function MoviesView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  const sortedMovies = moviesContextValue.items.sort(compareMovies)
  const movieViews = sortedMovies.map(movie => {
    return (
      <MovieProvider key={movie.id} movie={movie}>
        <MovieRow />
      </MovieProvider>
    )
  })
  return (
    <VStack>
      <HStack flexWrap='wrap' justifyContent='center'>
        <OptionProvider
          chooseHotkey='a'
          openHotkey='s'
          optionIndex={moviesContextValue.choice?.leftIndex}
        >
          <OptionView />
        </OptionProvider>
        <OptionProvider
          optionIndex={moviesContextValue.choice?.rightIndex}
          chooseHotkey='b'
          openHotkey='f'
        >
          <OptionView />
        </OptionProvider>
      </HStack>
      <DeferView />

      <Table>
        <Thead>
          <Tr>
            <Th>Movie ({moviesContextValue.items.length})</Th>
            <Th>Points</Th>
            <Th>Score</Th>
          </Tr>
        </Thead>
        <Tbody>
          <ReviewView />
          <Tr>
            <Td colSpan={3} textAlign='center'>
              <ImportButtonView />
            </Td>
          </Tr>
          {movieViews}
        </Tbody>
      </Table>
    </VStack>
  )
}
