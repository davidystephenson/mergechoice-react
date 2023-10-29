import { ReactNode, useState } from 'react'
import { Movie, MoviesContextValue, SortedMovies } from '../../types'
import moviesContext from './moviesContext'
import getDefaultOptionIndex from '../../service/movies/getDefaultOptionIndex'
import getStorage from '../../service/mergeChoice/getStorage'
import clone from '../../service/mergeChoice/clone'
import { STATE } from '../../constants'
import chooseOption from '../../service/mergeChoice/chooseOption'
import createRandomChoice from '../../service/mergeChoice/createRandomChoice'
import removeItem from '../../service/mergeChoice/removeItem'
import importItems from '../../service/mergeChoice/importItems'
import rewindState from '../../service/mergeChoice/rewindState'
import getChoiceCount from '../../service/mergeChoice/getChoiceCount'
import getSortedMovies from '../../service/movies/getSortedMovies'
import { State, HistoryEvent } from '../../service/mergeChoice/types'

export default function MoviesProvider ({
  children
}: {
  children: ReactNode
}): JSX.Element {
  const [state, setState] = useState<State<Movie>>(() => {
    return getStorage({ key: 'state', defaultValue: STATE })
  })
  const [sortedMovies, setSortedMovies] = useState<SortedMovies>(() => {
    const sortedMovies = getSortedMovies({ state })
    return sortedMovies
  })
  const [choosing, setChoosing] = useState(false)
  console.log('choosing', choosing)
  function storeState (newState: State<Movie>): void {
    const newHistory = state.history.map(event => {
      const newEvent = clone<HistoryEvent<Movie>>(event)
      delete newEvent.previousState
      return newEvent
    })
    const historyState = {
      ...newState,
      history: newHistory
    }
    localStorage.setItem('state', JSON.stringify(historyState))
  }
  async function updateState (callback: (current: State<Movie>) => Promise<State<Movie>>): Promise<void> {
    console.log('updateState')
    console.time('newState')
    const newState = await callback(state)
    console.log('newState', newState)
    console.timeEnd('newState')
    console.time('sortedMovies')
    const sortedMovies = getSortedMovies({ state: newState })
    console.log('sortedMovies', sortedMovies)
    console.timeEnd('sortedMovies')
    setSortedMovies(sortedMovies)
    storeState(newState)
    setState(newState)
  }

  async function importMovies ({ movies }: {
    movies: Movie[]
  }): Promise<void> {
    await updateState(async current => {
      const newState = importItems({ items: movies, state: current })
      return newState
    })
  }
  async function choose ({ betterIndex }: {
    betterIndex: number
  }): Promise<void> {
    setChoosing(true)
    void updateState(async current => {
      const newState = chooseOption({ state: current, betterIndex })
      setChoosing(false)
      return newState
    })
  }
  async function removeMovie ({ id }: { id: string }): Promise<void> {
    await updateState(async current => {
      const newState = removeItem({ id, state: current })
      return newState
    })
  }
  async function rewind ({ historyEventId }: {
    historyEventId: string
  }): Promise<void> {
    await updateState(async current => {
      const newState = rewindState({ state: current, historyEventId })
      return newState
    })
  }
  async function createRandomMovieChoice (): Promise<void> {
    await updateState(async current => {
      const newState = createRandomChoice({ state: current })
      return newState
    })
  }
  const defaultOptionIndex = getDefaultOptionIndex({
    movies: state.activeItems,
    choice: state.choice
  })
  const choiceCount = getChoiceCount({ state })
  const random = state.choice?.random === true
  const value: MoviesContextValue = {
    ...state,
    choose,
    choiceCount,
    choosing,
    createRandomMovieChoice,
    defaultOptionIndex,
    importMovies,
    removeMovie,
    random,
    rewind,
    sortedMovies,
    state
  }
  return (
    <moviesContext.Provider value={value}>
      {children}
    </moviesContext.Provider>
  )
}
