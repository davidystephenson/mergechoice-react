import { ReactNode } from 'react'
import optionContext from './optionContext'
import { OptionContextValue } from '../../types'
import useListContext from '../list/useListContext'
import findByOption from '../../service/findByOption'

export default function OptionProvider ({ children, optionIndex }: {
  children: ReactNode
  optionIndex?: number
}): JSX.Element {
  const listContextValue = useListContext()
  if (optionIndex == null) {
    return <></>
  }
  const item = findByOption({
    choice: listContextValue.choice,
    finalized: listContextValue.finalized,
    items: listContextValue.movies,
    optionIndex
  })
  function choose (): void {
    if (optionIndex == null) {
      throw new Error('optionIndex is null')
    }
    listContextValue.applyChoice({ optionIndex })
  }
  if (item == null) {
    return <></>
  }
  const value: OptionContextValue = {
    choose,
    item,
    optionIndex
  }
  return (
    <optionContext.Provider value={value}>
      {children}
    </optionContext.Provider>
  )
}
