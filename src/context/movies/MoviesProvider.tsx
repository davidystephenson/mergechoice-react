import { ReactNode, useState } from 'react'
import { Movie, MoviesContextValue } from '../../types'
import moviesContext from './moviesContext'
import getDefaultOptionIndex from '../../service/mergeChoice/getDefaultOptionIndex'
import getStorage from '../../service/mergeChoice/getStorage'
import createState from '../../service/mergeChoice/createState'
import chooseOption from '../../service/mergeChoice/chooseOption'
import removeItem from '../../service/mergeChoice/removeItem'
import importItems from '../../service/mergeChoice/importItems'
import rewindState from '../../service/mergeChoice/rewindState'
import getChoiceCountRange from '../../service/mergeChoice/getChoiceCount'
import getSortedMovies from '../../service/movies/getSortedMovies'
import { ItemId, State } from '../../service/mergeChoice/mergeChoiceTypes'
import isResult from '../../service/movies/isResult'
import resetItem from '../../service/mergeChoice/resetItem'
import shuffleSlice from '../../service/shuffleSlice/shuffleSlice'
// import restoreEvent from '../../service/mergeChoice/restoreEvent'
import setupRandomChoice from '../../service/mergeChoice/setupRandomChoice'
import archiveItem from '../../service/mergeChoice/archiveItem'
import unarchiveItem from '../../service/mergeChoice/unarchiveItem'

export default function MoviesProvider ({
  children
}: {
  children: ReactNode
}): JSX.Element {
  const [state, setState] = useState<State<Movie>>(() => {
    return getStorage({ key: 'state', defaultValue: createState() })
  })
  // console.log('render state', state)
  // const initialState = createState<Movie>()
  // const reversed = state.history.slice().reverse()
  // const deduced = reversed.reduce<State<Movie>>((state, event) => {
  //   const restoredState = restoreEvent({ event, state })
  //   const lastEvent = restoredState.history[0]
  //   lastEvent.createdAt = event.createdAt
  //   return restoredState
  // }, initialState)
  // void deduced
  // console.log('render deduced', deduced)
  const [sortedMovies, setSortedMovies] = useState(() => {
    const sortedMovies = getSortedMovies({ state })
    return sortedMovies
  })
  const [choosing, setChoosing] = useState(false)
  const [query, setQuery] = useState('')
  const defaultOptionIndex = getDefaultOptionIndex({
    movies: state.items,
    choice: state.choice
  })
  const choiceCountRange = getChoiceCountRange({ state })
  const random = state.choice?.random === true
  const searching = query !== ''
  const resultMovies = sortedMovies.filter(movie => {
    return isResult({ movie, query })
  })
  async function archiveMovie (props: {
    itemId: ItemId
  }): Promise<void> {
    void updateState(async current => {
      const newState = archiveItem({ itemId: props.itemId, state: current })
      return newState
    })
  }
  async function storeState (newState: State<Movie>): Promise<void> {
    localStorage.setItem('state', JSON.stringify(newState))
  }
  async function updateState (callback: (current: State<Movie>) => Promise<State<Movie>>): Promise<void> {
    const newState = await callback(state)
    const sortedMovies = getSortedMovies({ state: newState })
    setSortedMovies(sortedMovies)
    setState(newState)
    void storeState(newState)
  }
  async function importMovies (props: {
    movies: Movie[]
    slice?: number
  }): Promise<void> {
    void updateState(async current => {
      const sliced = shuffleSlice({
        slice: props.slice,
        items: props.movies
      })
      const newState = importItems({
        items: sliced,
        state: current
      })
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
  async function removeMovie ({ itemId }: { itemId: ItemId }): Promise<void> {
    void updateState(async current => {
      const newState = removeItem({ itemId, state: current })
      return newState
    })
  }
  async function resetMovie ({ itemId }: { itemId: ItemId }): Promise<void> {
    void updateState(async current => {
      const newState = resetItem({ itemId, state: current })
      return newState
    })
  }
  async function rewind ({ historyEventId }: {
    historyEventId: ItemId
  }): Promise<void> {
    void updateState(async current => {
      const newState = rewindState({ state: current, historyEventId })
      return newState
    })
  }
  async function createRandomMovieChoice (): Promise<void> {
    void updateState(async current => {
      const newState = setupRandomChoice({ state: current })
      return newState
    })
  }
  async function unarchiveMovie (props: { itemId: ItemId }): Promise<void> {
    void updateState(async current => {
      const newState = unarchiveItem({ itemId: props.itemId, state: current })
      return newState
    })
  }

  function undo (): void {
    void updateState(async current => {
      return current
    })
  }
  const value: MoviesContextValue = {
    ...state,
    archiveMovie,
    choose,
    choiceCountRange,
    choosing,
    createRandomMovieChoice,
    defaultOptionIndex,
    importMovies,
    query,
    random,
    removeMovie,
    resetMovie,
    resultMovies,
    rewind,
    searching,
    setQuery,
    sortedMovies,
    state,
    unarchiveMovie,
    undo
  }
  return (
    <moviesContext.Provider value={value}>
      {children}
    </moviesContext.Provider>
  )
}
