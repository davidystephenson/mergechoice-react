import { ChangeEvent, useRef, useState } from 'react'
import { Button, HStack, Table, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import Papa from 'papaparse'
import OptionView from './view/Option'
import DeferView from './view/Defer'
import { Movie, CritickerRow } from './types'
import compareMovies from './service/compareMovies'
import useMoviesContext from './context/movies/useMoviesContext'
import OptionProvider from './context/option/OptionProvider'
import ReviewView from './view/Review'
import MovieProvider from './context/movie/MovieProvider'
import MovieRow from './view/MovieRow'

export default function Movies (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  const [initializing, setInitializing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  function handleFileChange (e: ChangeEvent<HTMLInputElement>): void {
    if (moviesContextValue == null) {
      throw new Error('There is no criticker state.')
    }
    const file = e.target.files?.[0]
    if (file == null) {
      throw new Error('There is no file.')
    }
    setInitializing(true)
    Papa.parse<CritickerRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const updatedAt = Date.now()
        const movies: Movie[] = results.data.map((row: CritickerRow) => {
          const date = new Date(row[' Date Rated'])
          const score = Number(row.Score)
          const year = Number(row[' Year'])
          return {
            date,
            id: row[' IMDB ID'],
            imdbId: row[' IMDB ID'],
            review: row[' Mini Review'],
            score,
            title: row[' Film Name'],
            year,
            updatedAt,
            url: row[' URL'],
            points: 0
          }
        })
        moviesContextValue.populate({ movies })
        setInitializing(false)
      }
    })
  }
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
          optionIndex={moviesContextValue.choice.leftIndex}
        >
          <OptionView />
        </OptionProvider>
        <OptionProvider
          optionIndex={moviesContextValue.choice.rightIndex}
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
              <Button
                isLoading={initializing}
                onClick={() => inputRef.current?.click()}
              >
                Import
              </Button>
              <input
                hidden
                type='file'
                ref={inputRef}
                onChange={handleFileChange}
              />
            </Td>
          </Tr>
          {movieViews}
        </Tbody>
      </Table>
    </VStack>
  )
}
