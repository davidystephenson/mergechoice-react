import { ChangeEvent, useRef, useState } from 'react'
import { Button, Center, HStack, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import Papa from 'papaparse'
import OptionView from './view/Option'
import DeferView from './view/Defer'
import { Movie, CritickerRow } from './types'
import compareMovies from './service/compareMovies'
import useListContext from './context/list/useListContext'
import OptionProvider from './context/option/OptionProvider'

export default function Movies (): JSX.Element {
  const listContextValue = useListContext()
  const [initializing, setInitializing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  if (listContextValue == null) {
    throw new Error('There is no list context.')
  }
  function handleFileChange (e: ChangeEvent<HTMLInputElement>): void {
    if (listContextValue == null) {
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
            url: row[' URL'],
            points: 0
          }
        })
        listContextValue.populate({ movies })
        setInitializing(false)
      }
    })
  }
  const sortedMovies = listContextValue.items.sort(compareMovies)
  const movieViews = sortedMovies.map(movie => {
    return (
      <Tr key={movie.id}>
        <Td>{movie.title}</Td>
        <Td>{movie.points}</Td>
        <Td>{movie.score}</Td>
      </Tr>
    )
  })
  return (
    <>
      <HStack flexWrap='wrap' justifyContent='center'>
        <OptionProvider
          chooseHotkey='a'
          openHotkey='s'
          optionIndex={listContextValue.choice.leftIndex}
        >
          <OptionView />
        </OptionProvider>
        <OptionProvider
          optionIndex={listContextValue.choice.rightIndex}
          chooseHotkey='b'
          openHotkey='f'
        >
          <OptionView />
        </OptionProvider>
      </HStack>
      <DeferView />
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
      <Center>
        <Table>
          <Thead>
            <Tr>
              <Th>Movie ({listContextValue.items.length})</Th>
              <Th>Points</Th>
              <Th>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {movieViews}
          </Tbody>
        </Table>
      </Center>
    </>
  )
}
