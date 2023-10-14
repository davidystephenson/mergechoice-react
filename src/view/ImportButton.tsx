import { ChangeEvent, useRef, useState } from 'react'
import { Button } from '@chakra-ui/react'
import Papa from 'papaparse'
import useMoviesContext from '../context/movies/useMoviesContext'
import { CritickerRow, Movie } from '../types'
import { useHotkeys } from 'react-hotkeys-hook'
import getShuffled from '../service/getShuffled'

export default function ImportButtonView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  const [initializing, setInitializing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  useHotkeys('i', () => {
    console.log('inputRef', inputRef)
    inputRef.current?.click()
  })
  function parseCriticker ({
    data
  }: {
    data: CritickerRow[]
  }): void {
    const updatedAt = Date.now()
    const movies: Movie[] = data.map((row: CritickerRow) => {
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
    const selection = getShuffled(movies).slice(0, 5)
    moviesContextValue.populate({ movies: selection })
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
      complete: parseCriticker
    })
  }
  return (
    <>
      <Button
        isLoading={initializing}
        onClick={() => inputRef.current?.click()}
        fontSize='sm'
        size='xs'
        variant='solid'
      >
        [i]mport
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
