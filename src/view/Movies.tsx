import { HStack, Table, Tbody, VStack, Heading, Text, Th, Tr } from '@chakra-ui/react'
import OptionView from './Option'
import DeferView from './Defer'
import compareMovies from '../service/compareMovies'
import useMoviesContext from '../context/movies/useMoviesContext'
import OptionProvider from '../context/option/OptionProvider'
import HistoryView from './History'
import MovieProvider from '../context/movie/MovieProvider'
import MovieRow from './MovieRow'
import ImportButtonView from './ImportButton'
import SingleRowView from './SingleRow'

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
  const headingsView = moviesContextValue.items.length > 0 && (
    <Tr>
      <Th>
        <HStack>
          <Text w='max-content'>Movie ({moviesContextValue.items.length})</Text>
        </HStack>
      </Th>
      <Th>Points</Th>
      <Th>Score</Th>
    </Tr>
  )
  return (
    <VStack spacing='0'>
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
      <Table size='sm'>
        <Tbody>
          <HistoryView />
          <SingleRowView cellProps={{ borderBottom: '1px solid lightgray', borderTop: '1px solid lightgray' }}>
            <HStack justifyContent='center'>
              <Heading size='sm'>List</Heading>
              <ImportButtonView />
            </HStack>
          </SingleRowView>
          {headingsView}
          {movieViews}
        </Tbody>
      </Table>
    </VStack>
  )
}
