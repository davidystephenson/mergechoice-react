import { ReactNode } from 'react'
import { HistoryEventContextValue, Movie } from '../../types'
import historyEventContext from './historyEventContext'
import useMoviesContext from '../movies/useMoviesContext'
import { HistoryEvent } from '../../service/mergeChoice/merge-choice-types'

export default function HistoryEventProvider (props: {
  children: ReactNode
  historyEvent: HistoryEvent<Movie>
}): JSX.Element {
  const moviesContextValue = useMoviesContext()
  async function rewind (): Promise<void> {
    await moviesContextValue.rewind({
      historyEventId: props.historyEvent.id
    })
  }
  const timestamp = new Date(props.historyEvent.createdAt).toLocaleString()
  const value: HistoryEventContextValue = {
    ...props.historyEvent,
    rewind,
    timestamp
  }
  return (
    <historyEventContext.Provider value={value}>
      {props.children}
    </historyEventContext.Provider>
  )
}
