import { ReactNode, useState } from 'react'
import useMoviesContext from '../movies/useMoviesContext'
import historyContext from './historyContext'
import { HistoryContextValue } from '../../types'
import isEventResult from '../../service/movies/isEventResult'
import { ItemId } from '../../service/mergeChoice/merge-choice-types'

export default function HistoryProvider (props: {
  children: ReactNode
}): JSX.Element {
  const moviesContextValue = useMoviesContext()
  const [expanded, setExpanded] = useState(false)
  const [openIds, setOpenIds] = useState<ItemId[]>([])
  function closeEvent (id: ItemId): void {
    setOpenIds(current => current.filter(currentId => currentId !== id))
  }
  function toggleEvent (id: ItemId): void {
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
      {props.children}
    </historyContext.Provider>
  )
}
