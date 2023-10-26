import { ReactNode, useState } from 'react'
import { Movie, MoviesContextValue, HistoryEvent, State, HistoryMovie } from '../../types'
import moviesContext from './moviesContext'
import getDefaultOptionIndex from '../../service/getDefaultOptionIndex'
import getStorage from '../../service/getStorage'
import clone from '../../service/clone'
import createChoice from '../../service/createChoice'
import setupChoice from '../../service/setupChoice'
import populate from '../../service/populate'
import { STATE } from '../../constants'
import chooseOption from '../../service/chooseOption'
import createRandomChoice from '../../service/createRandomChoice'
import yeast from 'yeast'
import findById from '../../service/findById'
import getPoints from '../../service/getPoints'
import removeFromOperations from '../../service/removeFromOperations'
import getOperations from '../../service/getOperations'
import getTotalSteps from '../../service/getTotalSteps'

export default function MoviesProvider ({
  children
}: {
  children: ReactNode
}): JSX.Element {
  const [state, setState] = useState(() => {
    return getStorage({ key: 'state', defaultValue: STATE })
  })
  const [choosing] = useState(false)
  function importMovies ({ movies }: {
    movies: Movie[]
  }): void {
    const populatedState = populate({
      items: movies,
      state
    })
    const historyEvent: HistoryEvent = {
      createdAt: Date.now(),
      import: {
        items: movies
      },
      id: yeast(),
      previousState: clone(state)
    }
    populatedState.history.unshift(historyEvent)
    setState(populatedState)
    storeState(populatedState)
  }
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
  const random = state.choice?.random === true
  const activeTotal = getTotalSteps({
    items: state.activeItems,
    operations: state.activeOperations
  })
  const betterTotal = getTotalSteps({
    items: state.betterItems,
    operations: state.betterOperations
  })
  const worseTotal = getTotalSteps({
    items: state.worseItems,
    operations: state.worseOperations
  })
  const reserveOperations = state.reserveItems.map(item => {
    return {
      input: [[], []],
      output: [item.id]
    }
  })
  const newReserveOperations = getOperations({
    activeOperations: reserveOperations
  })
  const activePostOperation = {
    input: [[], []],
    output: state.activeItems.map(item => item.id)
  }
  const betterPostOperation = {
    input: [[], []],
    output: state.betterItems.map(item => item.id)
  }
  const worsePostOperation = {
    input: [[], []],
    output: state.worseItems.map(item => item.id)
  }
  const reserveTotal = getTotalSteps({
    items: [...state.activeItems, ...state.betterItems, ...state.reserveItems, ...state.worseItems],
    operations: [
      ...newReserveOperations,
      activePostOperation,
      betterPostOperation,
      worsePostOperation
    ]
  })
  const minimumCount = activeTotal.minimum + betterTotal.minimum + worseTotal.minimum + reserveTotal.minimum
  const maximumCount = activeTotal.maximum + betterTotal.maximum + worseTotal.maximum + reserveTotal.maximum
  const value: MoviesContextValue = {
    ...state,
    choose,
    choosing,
    createRandomMovieChoice,
    defaultOptionIndex,
    maximumCount,
    minimumCount,
    movies: state.activeItems,
    importMovies,
    removeMovie,
    random,
    rewind,
    state
  }
  return (
    <moviesContext.Provider value={value}>
      {children}
    </moviesContext.Provider>
  )
}
