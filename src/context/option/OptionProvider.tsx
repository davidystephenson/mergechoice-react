import { ReactNode } from 'react'
import optionContext from './optionContext'
import { OptionContextValue } from '../../types'
import useMoviesContext from '../movies/useMoviesContext'
import findByOption from '../../service/findByOption'

export default function OptionProvider ({
  children,
  chooseHotkey,
  openHotkey,
  optionIndex
}: {
  children: ReactNode
  chooseHotkey: string
  openHotkey?: string
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
    finalized: moviesContextValue.finalized,
    items: moviesContextValue.activeItems,
    optionIndex
  })
  function choose (): void {
    if (optionIndex == null) {
      throw new Error('optionIndex is null')
    }
    moviesContextValue.choose({ betterIndex: optionIndex })
  }
  if (movie == null) {
    return <></>
  }
  const value: OptionContextValue = {
    choose,
    chooseHotkey,
    movie,
    openHotkey,
    optionIndex
  }
  return (
    <optionContext.Provider value={value}>
      {children}
    </optionContext.Provider>
  )
}
