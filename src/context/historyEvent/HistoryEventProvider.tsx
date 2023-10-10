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
  const value: HistoryEventContextValue = {
    ...historyEvent,
    betterMovie: historyEvent.betterItem,
    worseMovie: historyEvent.worseItem,
    rewind
  }
  return (
    <historyEventContext.Provider value={value}>
      {children}
    </historyEventContext.Provider>
  )
}
