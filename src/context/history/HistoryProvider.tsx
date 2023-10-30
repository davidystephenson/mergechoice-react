import { ReactNode, useState } from 'react'
import useMoviesContext from '../movies/useMoviesContext'
import historyContext from './historyContext'
import { HistoryContextValue } from '../../types'

export default function HistoryProvider ({ children }: {
  children: ReactNode
}): JSX.Element {
  const moviesContextValue = useMoviesContext()
  const [expanded, setExpanded] = useState(false)
  const [openIds, setOpenIds] = useState<string[]>([])
  function closeEvent (id: string): void {
    setOpenIds(current => current.filter(currentId => currentId !== id))
  }
  function toggleEvent (id: string): void {
    setOpenIds(current => {
      if (current.includes(id)) {
        return current.filter(currentId => currentId !== id)
      }
      return [...current, id]
    })
  }
  function toggleExpanded (): void {
    setExpanded(current => !current)
  }
  const isSingle = moviesContextValue.history.length === 1
  const [firstEvent, ...restEvents] = moviesContextValue.history
  const value: HistoryContextValue = {
    closeEvent,
    events: moviesContextValue.history,
    expanded,
    firstEvent,
    isSingle,
    toggleEvent,
    openIds,
    restEvents,
    toggleExpanded
  }
  return (
    <historyContext.Provider value={value}>
      {children}
    </historyContext.Provider>
  )
}
