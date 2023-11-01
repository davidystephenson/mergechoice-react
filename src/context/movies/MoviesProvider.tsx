import { ReactNode, useState } from 'react'
import { Movie, MoviesContextValue } from '../../types'
import moviesContext from './moviesContext'
import getDefaultOptionIndex from '../../service/movies/getDefaultOptionIndex'
import getStorage from '../../service/mergeChoice/getStorage'
import STATE from '../../service/mergeChoice/STATE'
import chooseOption from '../../service/mergeChoice/chooseOption'
import createRandomChoice from '../../service/mergeChoice/createRandomChoice'
import removeItem from '../../service/mergeChoice/removeItem'
import importItems from '../../service/mergeChoice/importItems'
import rewindState from '../../service/mergeChoice/rewindState'
import getChoiceCount from '../../service/mergeChoice/getChoiceCount'
import getSortedMovies from '../../service/movies/getSortedMovies'
import { State } from '../../service/mergeChoice/types'
import isResult from '../../service/movies/isResult'

export default function MoviesProvider ({
  children
}: {
  children: ReactNode
}): JSX.Element {
  const [state, setState] = useState<State<Movie>>(() => {
    return getStorage({ key: 'state', defaultValue: STATE() })
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
  const choiceCount = getChoiceCount({ state })
  const random = state.choice?.random === true
  const searching = query !== ''
  const resultMovies = sortedMovies.filter(movie => {
    return isResult({ movie, query })
  })
  async function storeState (newState: State<Movie>): Promise<void> {
    const newHistory = state.history.map(event => {
      const { previousState, ...rest } = event
      void previousState
      return rest
    })
    const historyState = {
      ...newState,
      history: newHistory
    }
    localStorage.setItem('state', JSON.stringify(historyState))
  }
  async function updateState (callback: (current: State<Movie>) => Promise<State<Movie>>): Promise<void> {
    const newState = await callback(state)
    const sortedMovies = getSortedMovies({ state: newState })
    setSortedMovies(sortedMovies)
    setState(newState)
    void storeState(newState)
  }
  async function importMovies ({ movies }: {
    movies: Movie[]
  }): Promise<void> {
    void updateState(async current => {
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
    void updateState(async current => {
      const newState = removeItem({ id, state: current })
      return newState
    })
  }
  async function rewind ({ historyEventId }: {
    historyEventId: string
  }): Promise<void> {
    void updateState(async current => {
      const newState = rewindState({ state: current, historyEventId })
      return newState
    })
  }
  async function createRandomMovieChoice (): Promise<void> {
    void updateState(async current => {
      const newState = createRandomChoice({ state: current })
      return newState
    })
  }
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
    query,
    resultMovies,
    rewind,
    searching,
    setQuery,
    sortedMovies,
    state
  }
  return (
    <moviesContext.Provider value={value}>
      {children}
    </moviesContext.Provider>
  )
}
