import { ReactNode } from 'react'
import { HistoryEvent, HistoryEventContextValue } from '../../types'
import historyEventContext from './historyEventContext'
import useMoviesContext from '../movies/useMoviesContext'

export default function HistoryEventProvider ({
  children,
  historyEvent
}: {
  children: ReactNode
  historyEvent: HistoryEvent
}): JSX.Element {
  const moviesContextValue = useMoviesContext()
  function rewind (): void {
    moviesContextValue.rewind({
      historyEventId: historyEvent.id
    })
  }
  const timestamp = new Date(historyEvent.createdAt).toLocaleString()
  const value: HistoryEventContextValue = {
    ...historyEvent,
    rewind,
    timestamp
  }
  return (
    <historyEventContext.Provider value={value}>
      {children}
    </historyEventContext.Provider>
  )
}
