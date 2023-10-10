import { useContext } from 'react'
import { HistoryEventContextValue } from '../../types'
import historyEventContext from './historyEventContext'

export default function useHistoryEventContext (): HistoryEventContextValue {
  const value = useContext(historyEventContext)
  if (value === null) {
    throw new Error('useHistoryEventContext must be used within a HistoryEventContextProvider')
  }
  return value
}
