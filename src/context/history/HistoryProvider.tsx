import { ReactNode, useState } from 'react'
import useMoviesContext from '../movies/useMoviesContext'
import historyContext from './historyContext'
import { HistoryContextValue } from '../../types'
import isEpisodeResult from '../../service/movies/isEpisodeResult'
import { ItemId } from '../../service/mergechoice/mergeChoiceTypes'

export default function HistoryProvider (props: {
  children: ReactNode
}): JSX.Element {
  const moviesContextValue = useMoviesContext()
  const [expanded, setExpanded] = useState(false)
  const [openIds, setOpenIds] = useState<ItemId[]>([])
  function episode (itemId: ItemId): void {
    setOpenIds(current => current.filter(currentId => currentId !== itemId))
  }
  function toggleEpisode (itemId: ItemId): void {
    setOpenIds(current => {
      if (current.includes(itemId)) {
        return current.filter(currentId => currentId !== itemId)
      }
      return [...current, itemId]
    })
  }
  function toggleExpanded (): void {
    setExpanded(current => !current)
  }
  const resultEpisodes = moviesContextValue.history.filter(episode => {
    return isEpisodeResult({ episode, query: moviesContextValue.query })
  })
  const isSingle = resultEpisodes.length === 1
  const [firstEpisode, ...restEpisodes] = resultEpisodes
  const value: HistoryContextValue = {
    closeEpisode: episode,
    episodes: moviesContextValue.history,
    expanded,
    firstEpisode,
    isSingle,
    toggleEpisode,
    openIds,
    resultEpisodes,
    restEpisodes,
    toggleExpanded
  }
  return (
    <historyContext.Provider value={value}>
      {props.children}
    </historyContext.Provider>
  )
}
