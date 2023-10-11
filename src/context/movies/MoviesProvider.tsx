import { ReactNode, useState } from 'react'
import { Movie, MoviesContextValue, HistoryEvent } from '../../types'
import moviesContext from './moviesContext'
import chooseOption from '../../service/chooseOption'
import getDefaultOptionIndex from '../../service/getDefaultOptionIndex'
import { STATE } from '../../constants'
import initializeState from '../../service/initializeState'
import getStorage from '../../service/getStorage'
import findById from '../../service/findById'
import clone from '../../service/clone'
import createChoice from '../../service/createChoice'
import setupChoice from '../../service/setupChoice'
import yeast from 'yeast'

export default function MoviesProvider ({
  children
}: {
  children: ReactNode
}): JSX.Element {
  const [state, setState] = useState(() => {
    return getStorage({ key: 'state', defaultValue: STATE })
  })
  const [choosing] = useState(false)
  const [history, setHistory] = useState(() => {
    return getStorage<HistoryEvent[]>({
      key: 'history', defaultValue: []
    })
  })
  function populate ({ movies }: {
    movies: Movie[]
  }): void {
    const initialState = initializeState({ items: movies })
    setState(initialState)
    setHistory([])
  }
  function applyChoice ({ optionIndex }: {
    optionIndex: number
  }): void {
    if (state.choice == null) {
      throw new Error('There is no choice.')
    }
    const [aId, bId] = state.choice.options
    const aBetter = optionIndex === state.choice.leftIndex
    const aItem = findById({ items: state.items, id: aId })
    const bItem = findById({ items: state.items, id: bId })
    const newHistoryEvent = {
      aBetter,
      aId,
      aItem,
      bId,
      bItem,
      createdAt: Date.now(),
      id: yeast(),
      previousHistory: history,
      previousState: state
    }
    setHistory(current => {
      const newHistory = [newHistoryEvent, ...current]
      // localStorage.setItem('history', JSON.stringify(newHistory))
      return newHistory
    })
    setState(current => {
      const newState = chooseOption({
        state: current, betterIndex: optionIndex
      })
      // localStorage.setItem('state', JSON.stringify(newState))
      return newState
    })
  }
  function removeMovie ({ id }: { id: string }): void {
    setState(current => {
      const newState = clone(current)
      newState.items = newState.items.filter(item => item.id !== id)
      const fullOutputOperations = newState.operations.filter((operation) => {
        const newOperation = clone(operation)
        const inOutput = newOperation.output.includes(id)
        if (inOutput) {
          if (newOperation.steps === 0) {
            return false
          }
        }
        return true
      })
      let emptiedOperationIndex = -1
      newState.operations = fullOutputOperations.map((operation, index) => {
        const newOperation = clone(operation)
        const inFirstInput = newOperation.input[0].includes(id)
        const inSecondInput = newOperation.input[1].includes(id)
        const inInput = inFirstInput || inSecondInput
        if (!inInput) {
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

      const emptiedCurrentOperation = emptiedOperationIndex === newState.choice?.currentOperationIndex
      if (emptiedCurrentOperation) {
        return setupChoice({
          operations: newState.operations,
          items: newState.items
        })
      } else if (newState.choice?.options.includes(id) === true) {
        newState.choice = createChoice(newState)
      }
      // localStorage.setItem('state', JSON.stringify(newState))
      return newState
    })
  }
  function rewind ({ historyEventId }: {
    historyEventId: string
  }): void {
    const historyEvent = history.find(event => event.id === historyEventId)
    if (historyEvent == null) {
      const message = `There is no history event with id ${historyEventId}.`
      throw new Error(message)
    }
    setState(historyEvent.previousState)
    setHistory(historyEvent.previousHistory)
  }
  const defaultOptionIndex = state.choice == null
    ? undefined
    : getDefaultOptionIndex({
      items: state.items,
      choice: state.choice
    })
  const value: MoviesContextValue = {
    ...state,
    applyChoice,
    choosing,
    defaultOptionIndex,
    history,
    movies: state.items,
    populate,
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
