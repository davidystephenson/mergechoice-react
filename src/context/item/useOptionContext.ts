import { useContext } from 'react'
import itemContext from './optionContext'
import { OptionContextValue } from '../../types'

export default function useItemContext (): OptionContextValue {
  const itemContextValue = useContext(itemContext)
  if (itemContextValue == null) {
    throw new Error('useItemContext must be used within an ItemContextProvider')
  }
  return itemContextValue
}
