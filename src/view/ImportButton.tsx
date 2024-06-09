import { ChangeEvent, useRef, useState } from 'react'
import { Button, HStack, Icon, Text } from '@chakra-ui/react'
import Papa from 'papaparse'
import useMoviesContext from '../context/movies/useMoviesContext'
import { CritickerRow, Movie } from '../types'
import { useHotkeys } from 'react-hotkeys-hook'
import { BsCloudUpload } from 'react-icons/bs'
import getShuffled from '../service/shuffleSlice/getShuffled'

export default function ImportButtonView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  const [initializing, setInitializing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  useHotkeys('i', () => {
    inputRef.current?.click()
  })
  async function parseCriticker (props: {
    data: CritickerRow[]
  }): Promise<void> {
    const movies: Movie[] = props.data.map((row: CritickerRow) => {
      const date = new Date(row[' Date Rated'])
      const seed = Number(row.Score)
      const year = Number(row[' Year'])
      const movie: Movie = {
        date,
        id: Math.random(),
        imdbId: row[' IMDB ID'],
        review: row[' Mini Review'],
        seed,
        seeding: true,
        name: row[' Film Name'],
        year,
        url: row[' URL']
      }
      return movie
    })
    const shuffled = getShuffled(movies)
    await moviesContextValue.importMovies({ movies: shuffled })
    setInitializing(false)
  }
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
      complete: ({ data }) => {
        void parseCriticker({ data })
      }
    })
    if (inputRef.current == null) {
      throw new Error('There is no inputRef.')
    }
    inputRef.current.value = ''
  }
  function handleClick (): void {
    inputRef.current?.click()
  }
  return (
    <>
      <Button
        isLoading={initializing}
        onClick={handleClick}
        fontSize='sm'
        size='xs'
        variant='solid'
      >
        <HStack>
          <Text>[i]mport</Text>
          <Icon as={BsCloudUpload} />
        </HStack>
      </Button>
      <input
        hidden
        type='file'
        ref={inputRef}
        onChange={handleFileChange}
      />
    </>
  )
}
