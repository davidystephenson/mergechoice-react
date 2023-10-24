import { ReactNode, useState } from 'react'
import { Movie, MoviesContextValue, HistoryEvent, State } from '../../types'
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
      console.log('newState', newState)
      storeState(newState)
      return newState
    })
  }
  function removeMovie ({ id }: { id: string }): void {
    setState(current => {
      const newState = clone(current)
      newState.activeItems = newState.activeItems.filter(item => item.id !== id)
      let emptiedOperationIndex = -1
      newState.activeOperations = newState.activeOperations.map((operation, index) => {
        const newOperation = clone(operation)
        const inFirstInput = newOperation.input[0].includes(id)
        const inSecondInput = newOperation.input[1].includes(id)
        const inInput = inFirstInput || inSecondInput
        if (!inInput) {
          newOperation.output = newOperation.output.filter(existingId => existingId !== id)
          return newOperation
        }
        newOperation.steps = newOperation.steps - 1
        if (inFirstInput) {
          newOperation.input[0] = newOperation.input[0].filter(existingId => existingId !== id)
          if (newOperation.input[0].length === 0) {
            emptiedOperationIndex = index
            newOperation.output.push(...newOperation.input[1])
            newOperation.input[1] = []
            newOperation.steps = 0
          }
        }
        if (inSecondInput) {
          newOperation.input[1] = newOperation.input[1].filter(existingId => existingId !== id)
          if (newOperation.input[1].length === 0) {
            emptiedOperationIndex = index
            newOperation.output.push(...newOperation.input[0])
            newOperation.input[1] = []
            newOperation.steps = 0
          }
        }
        return newOperation
      })
      console.log('newOperationIds', newState.activeOperations)
      logOperations({
        label: 'newOperations',
        operations: newState.activeOperations,
        items: newState.activeItems
      })

      const emptiedCurrentOperation = emptiedOperationIndex === newState.choice?.currentOperationIndex
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
