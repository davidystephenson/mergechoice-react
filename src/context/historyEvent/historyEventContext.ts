import { createContext } from 'react'
import { HistoryEventContextValue } from '../../types'

const historyEventContext = createContext<HistoryEventContextValue | null>(null)
export default historyEventContext
