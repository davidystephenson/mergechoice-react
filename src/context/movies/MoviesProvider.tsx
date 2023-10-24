import { ReactNode, useState } from 'react'
import { Movie, MoviesContextValue, HistoryEvent, State, HistoryMovie } from '../../types'
import moviesContext from './moviesContext'
import getDefaultOptionIndex from '../../service/getDefaultOptionIndex'
import getStorage from '../../service/getStorage'
import clone from '../../service/clone'
import createChoice from '../../service/createChoice'
import setupChoice from '../../service/setupChoice'
import logOperations from '../../service/logOperation'
import populate from '../../service/populate'
import { STATE } from '../../constants'
import chooseOption from '../../service/chooseOption'
import createRandomChoice from '../../service/createRandomChoice'
import yeast from 'yeast'
import findById from '../../service/findById'
import getPoints from '../../service/getPoints'
import removeFromOperations from '../../service/removeFromOperations'

export default function MoviesProvider ({
  children
}: {
  children: ReactNode
}): JSX.Element {
  const [state, setState] = useState(() => {
    return getStorage({ key: 'state', defaultValue: STATE })
  })
  const [choosing] = useState(false)
  function populateMovies ({ movies }: {
    movies: Movie[]
  }): void {
    const populatedState = populate({
      items: movies,
      state
    })
    setState(populatedState)
  }
  function storeState (newState: State): void {
    state.history = state.history.map(event => {
      const newEvent = clone<HistoryEvent>(event)
      delete newEvent.previousState
      return newEvent
    })
    localStorage.setItem('state', JSON.stringify(newState))
  }
  function choose ({ betterIndex }: {
    betterIndex: number
  }): void {
    setState(current => {
      const newState = chooseOption({
        state: current, betterIndex
      })
      storeState(newState)
      return newState
    })
  }
  function removeMovie ({ id }: { id: string }): void {
    setState(current => {
      const currentItems = [...current.activeItems, ...current.betterItems, ...current.worseItems, ...current.reserveItems]
      const item = findById({ items: currentItems, id })
      const currentpoints = getPoints({ item, state: current })
      const historyItem: HistoryMovie = { ...item, points: currentpoints }
      const newState = clone(current)
      newState.activeItems = newState.activeItems.filter(item => item.id !== id)
      newState.reserveItems = newState.reserveItems.filter(item => item.id !== id)
      newState.betterItems = newState.betterItems.filter(item => item.id !== id)
      newState.worseItems = newState.worseItems.filter(item => item.id !== id)
      const activeRemoval = removeFromOperations({
        itemId: id,
        operations: newState.activeOperations
      })
      newState.activeOperations = activeRemoval.operations
      newState.betterOperations = removeFromOperations({ itemId: id, operations: newState.betterOperations }).operations
      newState.worseOperations = removeFromOperations({ itemId: id, operations: newState.worseOperations }).operations
      logOperations({
        label: 'newOperations',
        operations: newState.activeOperations,
        items: newState.activeItems
      })

      const removeEvent: HistoryEvent = {
        createdAt: Date.now(),
        remove: {
          id,
          item: historyItem
        },
        id: yeast(),
        previousState: clone(current)
      }
      newState.history.unshift(removeEvent)

      const emptiedCurrentOperation = activeRemoval.emptiedOperationIndex === newState.choice?.currentOperationIndex
      if (emptiedCurrentOperation) {
        return setupChoice(newState)
      } else if (newState.choice?.options.includes(id) === true) {
        newState.choice = createChoice(newState)
      }
      storeState(newState)
      return newState
    })
  }
  function rewind ({ historyEventId }: {
    historyEventId: string
  }): void {
    const historyEvent = state.history.find(event => event.id === historyEventId)
    if (historyEvent == null) {
      const message = `There is no history event with id ${historyEventId}.`
      throw new Error(message)
    }
    if (historyEvent.previousState == null) {
      const message = `There is no previous state for history event with id ${historyEventId}.`
      throw new Error(message)
    }
    setState(historyEvent.previousState)
    storeState(historyEvent.previousState)
  }
  function createRandomMovieChoice (): void {
    setState(current => {
      return createRandomChoice({ state: current })
    })
  }
  const defaultOptionIndex = state.choice == null
    ? undefined
    : getDefaultOptionIndex({
      items: state.activeItems,
      choice: state.choice
    })
  const value: MoviesContextValue = {
    ...state,
    choose,
    choosing,
    createRandomMovieChoice,
    defaultOptionIndex,
    movies: state.activeItems,
    populateMovies,
    removeMovie,
    rewind,
    state
  }
  return (
    <moviesContext.Provider value={value}>
      {children}
    </moviesContext.Provider>
  )
}
