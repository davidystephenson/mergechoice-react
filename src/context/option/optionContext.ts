import { createContext } from 'react'
import { OptionContextValue } from '../../types'

const optionContext = createContext<OptionContextValue | null>(null)
export default optionContext
