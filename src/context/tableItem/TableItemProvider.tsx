import { ReactNode } from 'react'
import { TableItem, TableItemContextValue } from '../../types'
import tableItemContext from './tableItemContext'

export default function TableItemProvider ({
  children,
  tableItem
}: {
  children: ReactNode
  tableItem: TableItem
}): JSX.Element {
  const value: TableItemContextValue = {
    ...tableItem
  }
  return (
    <tableItemContext.Provider value={value}>
      {children}
    </tableItemContext.Provider>
  )
}
