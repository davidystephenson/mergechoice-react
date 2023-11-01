import { useContext } from 'react'
import { TableItemContextValue } from '../../types'
import tableItemContext from './tableItemContext'

export default function useTableItemContext (): TableItemContextValue {
  const valu = useContext(tableItemContext)
  if (valu === null) {
    throw new Error('useTableItemContext must be used within a TableItemContextProvider')
  }
  return valu
}
