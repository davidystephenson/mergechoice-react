import { useContext } from 'react'
import optionContext from './optionContext'
import { OptionContextValue } from '../../types'

export default function useOptionContext (): OptionContextValue {
  const optionContextValue = useContext(optionContext)
  if (optionContextValue == null) {
    throw new Error('useOptionContext must be used within an OptionContextProvider')
  }
  return optionContextValue
}
