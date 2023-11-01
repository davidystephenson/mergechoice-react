import { ReactNode, useState } from 'react'
import useMoviesContext from '../movies/useMoviesContext'
import historyContext from './historyContext'
import { HistoryContextValue } from '../../types'
import isEventResult from '../../service/movies/isEventResult'

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
  const resultEvents = moviesContextValue.history.filter(event => {
    return isEventResult({ event, query: moviesContextValue.query })
  })
  const isSingle = resultEvents.length === 1
  const [firstEvent, ...restEvents] = resultEvents
  const value: HistoryContextValue = {
    closeEvent,
    events: moviesContextValue.history,
    expanded,
    firstEvent,
    isSingle,
    toggleEvent,
    openIds,
    resultEvents,
    restEvents,
    toggleExpanded
  }
  return (
    <historyContext.Provider value={value}>
      {children}
    </historyContext.Provider>
  )
}
