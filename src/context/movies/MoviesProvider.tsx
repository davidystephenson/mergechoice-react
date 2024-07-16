import { ReactNode, useState } from 'react'
import { Movie, MoviesContextValue } from '../../types'
import moviesContext from './moviesContext'
import getDefaultOptionIndex from '../../service/mergechoice/getDefaultOptionIndex'
import getStorage from '../../service/mergechoice/getStorage'
import chooseOption from '../../service/mergechoice/chooseOption'
import removeItem from '../../service/mergechoice/removeItem'
import importItems from '../../service/mergechoice/importItems'
import rewindState from '../../service/mergechoice/rewindState'
import getChoiceCountRange from '../../service/mergechoice/getChoiceCount'
import getSortedMovies from '../../service/movies/getSortedMovies'
import { ItemId, State, StoredState } from '../../service/mergechoice/mergeChoiceTypes'
import isResult from '../../service/movies/isResult'
import resetItem from '../../service/mergechoice/resetItem'
import setupRandomChoice from '../../service/mergechoice/setupRandomChoice'
import archiveItem from '../../service/mergechoice/archiveItem'
import unarchiveItem from '../../service/mergechoice/unarchiveItem'
import deduceState from '../../service/mergechoice/deduceState'
import createState from '../../service/mergechoice/createState'

export default function MoviesProvider (props: {
  children: ReactNode
}): JSX.Element {
  const [state, setState] = useState<State<Movie>>(() => {
    const storedState = getStorage<StoredState<Movie> | undefined>({
      key: 'storedState', defaultValue: undefined
    })
    if (storedState == null) {
      const random = Math.random()
      const seed = String(random)
      return createState<Movie>({ seed })
    }
    const deducedState = deduceState({ history: storedState.history, seed: storedState.seed })
    return deducedState
  })
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
    const storedState = {
      seed: newState.seed,
      history: newState.history
    }
    const string = JSON.stringify(storedState)
    localStorage.setItem('storedState', string)
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
      const sliced = props.movies.slice(0, props.slice)
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
  async function rewind ({ episodeId }: {
    episodeId: ItemId
  }): Promise<void> {
    void updateState(async current => {
      const newState = rewindState({ state: current, episodeId })
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
      {props.children}
    </moviesContext.Provider>
  )
}
