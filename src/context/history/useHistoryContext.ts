import { useContext } from 'react'
import { HistoryContextValue } from '../../types'
import historyContext from './historyContext'

export default function useHistoryContext (): HistoryContextValue {
  const value = useContext(historyContext)
  if (value === null) {
    throw new Error('useHistoryContext must be used within a HistoryContextProvider')
  }
  return value
}
