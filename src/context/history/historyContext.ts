import { createContext } from 'react'
import { HistoryContextValue } from '../../types'

const historyContext = createContext<HistoryContextValue | null>(null)
export default historyContext
