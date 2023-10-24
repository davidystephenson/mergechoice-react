import { ReactNode, useState } from 'react'
import useMoviesContext from '../movies/useMoviesContext'
import historyContext from './historyContext'
import { HistoryContextValue } from '../../types'

export default function HistoryProvider ({ children }: {
  children: ReactNode
}): JSX.Element {
  const moviesContextValue = useMoviesContext()
  console.log('moviesContextValue.history', moviesContextValue.history)
  const [expanded, setExpanded] = useState(false)
  function toggleExpanded (): void {
    setExpanded(current => !current)
  }
  const isSingle = moviesContextValue.history.length === 1
  const [firstEvent, ...restEvents] = moviesContextValue.history
  const value: HistoryContextValue = {
    events: moviesContextValue.history,
    expanded,
    firstEvent,
    isSingle,
    restEvents,
    toggleExpanded
  }
  return (
    <historyContext.Provider value={value}>
      {children}
    </historyContext.Provider>
  )
}
