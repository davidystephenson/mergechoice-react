import { ReactNode, useState } from 'react'
import { Movie, MoviesContextValue, HistoryEvent, State, SortedItems } from '../../types'
import moviesContext from './moviesContext'
import getDefaultOptionIndex from '../../service/getDefaultOptionIndex'
import getStorage from '../../service/getStorage'
import clone from '../../service/clone'
import { STATE } from '../../constants'
import chooseOption from '../../service/chooseOption'
import createRandomChoice from '../../service/createRandomChoice'
import removeItem from '../../service/removeItem'
import importItems from '../../service/importItems'
import rewindState from '../../service/rewindState'
import getChoiceCount from '../../service/getChoiceCount'
import getSortedItems from '../../service/getSortedItems'

export default function MoviesProvider ({
  children
}: {
  children: ReactNode
}): JSX.Element {
  const [state, setState] = useState(() => {
    return getStorage({ key: 'state', defaultValue: STATE })
  })
  const [sortedMovies, setSortedMovies] = useState<SortedItems>(() => {
    const sortedMovies = getSortedItems({ state })
    return sortedMovies
  })
  const [choosing, setChoosing] = useState(false)
  console.log('choosing', choosing)
  function storeState (newState: State): void {
    const newHistory = state.history.map(event => {
      const newEvent = clone<HistoryEvent>(event)
      delete newEvent.previousState
      return newEvent
    })
    const historyState = {
      ...newState,
      history: newHistory
    }
    localStorage.setItem('state', JSON.stringify(historyState))
  }
  async function updateState (callback: (current: State) => Promise<State>): Promise<void> {
    console.log('updateState')
    console.time('newState')
    const newState = await callback(state)
    console.log('newState', newState)
    console.timeEnd('newState')
    console.time('sortedMovies')
    const sortedMovies = getSortedItems({ state: newState })
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
    await updateState(async current => {
      const newState = chooseOption({ state: current, betterIndex })
      return newState
    })
    setChoosing(false)
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
    items: state.activeItems,
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
