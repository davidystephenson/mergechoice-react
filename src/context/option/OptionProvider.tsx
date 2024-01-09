import { ReactNode } from 'react'
import optionContext from './optionContext'
import { OptionContextValue } from '../../types'
import useMoviesContext from '../movies/useMoviesContext'
import findByOption from '../../service/movies/findByOption'

export default function OptionProvider ({
  children,
  chooseHotkey,
  optionIndex
}: {
  children: ReactNode
  chooseHotkey: string
  optionIndex?: number
}): JSX.Element {
  const moviesContextValue = useMoviesContext()
  if (optionIndex == null) {
    return <></>
  }
  if (moviesContextValue.choice == null) {
    throw new Error('There is no choice.')
  }
  const movie = findByOption({
    choice: moviesContextValue.choice,
    finalized: moviesContextValue.complete,
    movies: moviesContextValue.items,
    optionIndex
  })
  async function choose (): Promise<void> {
    if (optionIndex == null) {
      throw new Error('optionIndex is null')
    }
    await moviesContextValue.choose({ betterIndex: optionIndex })
  }
  if (movie == null) {
    return <></>
  }
  const value: OptionContextValue = {
    choose,
    chooseHotkey,
    movie,
    optionIndex
  }
  return (
    <optionContext.Provider value={value}>
      {children}
    </optionContext.Provider>
  )
}
