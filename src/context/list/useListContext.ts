import { useContext } from 'react'
import listContext from './listContext'
import { ListContextValue } from '../../types'

export default function useListContext (): ListContextValue {
  const context = useContext(listContext)
  if (context == null) {
    throw new Error('There is no ListContextProvider.')
  }
  return context
}
