import { ReactNode } from 'react'
import optionContext from './optionContext'
import { OptionContextValue } from '../../types'
import useListContext from '../list/useListContext'
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
  const listContextValue = useListContext()
  if (optionIndex == null) {
    return <></>
  }
  const movie = findByOption({
    choice: listContextValue.choice,
    finalized: listContextValue.finalized,
    items: listContextValue.items,
    optionIndex
  })
  function choose (): void {
    if (optionIndex == null) {
      throw new Error('optionIndex is null')
    }
    listContextValue.applyChoice({ optionIndex })
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
