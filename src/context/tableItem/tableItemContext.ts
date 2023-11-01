import { createContext } from 'react'
import { TableItemContextValue } from '../../types'

const tableItemContext = createContext<TableItemContextValue | null>(null)
export default tableItemContext
