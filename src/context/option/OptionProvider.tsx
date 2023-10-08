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
    choice: listContextValue.state.choice,
    finalized: listContextValue.state.finalized,
    items: listContextValue.state.items,
    optionIndex
  })
  if (item == null) {
    return <></>
  }
  const value: OptionContextValue = {
    item,
    optionIndex
  }
  return (
    <optionContext.Provider value={value}>
      {children}
    </optionContext.Provider>
  )
}
