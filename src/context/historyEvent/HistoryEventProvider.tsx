import { ReactNode } from 'react'
import { HistoryEventContextValue, Movie } from '../../types'
import historyEventContext from './historyEventContext'
import useMoviesContext from '../movies/useMoviesContext'
import { HistoryEvent } from '../../service/mergeChoice/types'

export default function HistoryEventProvider ({
  children,
  historyEvent
}: {
  children: ReactNode
  historyEvent: HistoryEvent<Movie>
}): JSX.Element {
  const moviesContextValue = useMoviesContext()
  async function rewind (): Promise<void> {
    await moviesContextValue.rewind({
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
