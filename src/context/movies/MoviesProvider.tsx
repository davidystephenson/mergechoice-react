import { ReactNode, useState } from 'react'
import { Movie, MoviesContextValue, HistoryEvent } from '../../types'
import moviesContext from './moviesContext'
import chooseOption from '../../service/chooseOption'
import getDefaultOptionIndex from '../../service/getDefaultOptionIndex'
import getStorage from '../../service/getStorage'
import findById from '../../service/findById'
import clone from '../../service/clone'
import createChoice from '../../service/createChoice'
import setupChoice from '../../service/setupChoice'
import yeast from 'yeast'
import logOperations from '../../service/logOperation'
import populate from '../../service/populate'
import { STATE } from '../../constants'

export default function MoviesProvider ({
  children
}: {
  children: ReactNode
}): JSX.Element {
  const [state, setState] = useState(() => {
    return getStorage({ key: 'state', defaultValue: STATE })
  })
  // console.log('state.operations', state.operations)
  // state.operations.forEach((operation, index) => {
  //   console.log('Operation index:', index)
  //   const input1Items = operation.input[0].map(id => findById({
  //     id, items: state.activeItems
  //   }))
  //   const input1Titles = input1Items.map(item => item.title).join(', ')
  //   console.log(`[${index}]`, 'Input 1:', input1Titles)
  //   const input2Items = operation.input[1].map(id => findById({
  //     id, items: state.activeItems
  //   }))
  //   const input2Titles = input2Items.map(item => item.title).join(', ')
  //   console.log(`[${index}]`, 'Input 2:', input2Titles)
  //   const outputTitles = operation.output.map(id => findById({
  //     id, items: state.activeItems
  //   }).title).join(', ')
  //   console.log(`[${index}]`, 'Output:', outputTitles)
  // })
  const [choosing] = useState(false)
  const [history, setHistory] = useState(() => {
    return getStorage<HistoryEvent[]>({
      key: 'history', defaultValue: []
    })
  })
  function populateMovies ({ movies }: {
    movies: Movie[]
  }): void {
    const populatedState = populate({
      items: movies,
      state
    })
    setState(populatedState)
  }
  function applyChoice ({ optionIndex }: {
    optionIndex: number
  }): void {
    if (state.choice == null) {
      throw new Error('There is no choice.')
    }
    const aId = state.choice.options[state.choice.aIndex]
    const bId = state.choice.options[state.choice.bIndex]
    const aBetter = optionIndex === state.choice.aIndex
    const aItem = findById({ items: state.activeItems, id: aId })
    const aPoints = aBetter ? aItem.points + 1 : aItem.points
    const aRecord = {
      ...aItem,
      points: aPoints
    }
    const bItem = findById({ items: state.activeItems, id: bId })
    const bPoints = aBetter ? bItem.points : bItem.points + 1
    const bRecord = {
      ...bItem,
      points: bPoints
    }
    const newHistoryEvent = {
      aBetter,
      aId,
      aItem: aRecord,
      bId,
      bItem: bRecord,
      createdAt: Date.now(),
      id: yeast(),
      previousState: state
    }
    setHistory(current => {
      const newHistory = [newHistoryEvent, ...current]
      const cleanHistory = newHistory.map(event => {
        const newEvent = clone<HistoryEvent>(event)
        delete newEvent.previousState
        return newEvent
      })
      localStorage.setItem('history', JSON.stringify(cleanHistory))
      return newHistory
    })
    setState(current => {
      const newState = chooseOption({
        state: current, betterIndex: optionIndex
      })
      localStorage.setItem('state', JSON.stringify(newState))
      return newState
    })
  }
  function removeMovie ({ id }: { id: string }): void {
    setState(current => {
      const newState = clone(current)
      newState.activeItems = newState.activeItems.filter(item => item.id !== id)
      // const fullOutputOperations = newState.operations.filter((operation) => {
      //   const newOperation = clone(operation)
      //   const inOutput = newOperation.output.includes(id)
      //   if (inOutput) {
      //     if (newOperation.steps === 0) {
      //       return false
      //     }
      //   }
      //   return true
      // })
      let emptiedOperationIndex = -1
      newState.operations = newState.operations.map((operation, index) => {
        const newOperation = clone(operation)
        const inFirstInput = newOperation.input[0].includes(id)
        const inSecondInput = newOperation.input[1].includes(id)
        const inInput = inFirstInput || inSecondInput
        if (!inInput) {
          const currentIndex = newOperation.output.indexOf(id)
          newOperation.output.forEach((id, index) => {
            if (index > currentIndex) findById({ id, items: newState.activeItems }).points -= 1
          })
          newOperation.input[0].forEach(id => {
            findById({ id, items: newState.activeItems }).points -= 1
          })
          newOperation.input[1].forEach(id => {
            findById({ id, items: newState.activeItems }).points -= 1
          })
          newOperation.output = newOperation.output.filter(existingId => existingId !== id)
          return newOperation
        }
        newOperation.steps = newOperation.steps - 1
        if (inFirstInput) {
          const currentIndex = newOperation.input[0].indexOf(id)
          newOperation.input[0].forEach((id, index) => {
            if (index > currentIndex) findById({ id, items: newState.activeItems }).points -= 1
          })
          newOperation.input[0] = newOperation.input[0].filter(existingId => existingId !== id)
          if (newOperation.input[0].length === 0) {
            emptiedOperationIndex = index
            newOperation.output.push(...newOperation.input[1])
            newOperation.input[1] = []
            newOperation.steps = 0
          }
        }
        if (inSecondInput) {
          const currentIndex = newOperation.input[1].indexOf(id)
          newOperation.input[1].forEach((id, index) => {
            if (index > currentIndex) findById({ id, items: newState.activeItems }).points -= 1
          })
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
      console.log('newOperationIds', newState.operations)
      logOperations({
        label: 'newOperations',
        operations: newState.operations,
        items: newState.activeItems
      })

      const emptiedCurrentOperation = emptiedOperationIndex === newState.choice?.currentOperationIndex
      if (emptiedCurrentOperation) {
        return setupChoice({
          betterItems: newState.betterItems,
          activeItems: newState.activeItems,
          reserveOperations: newState.operations,
          operations: newState.operations,
          reserveItems: newState.reserveItems,
          worseItems: newState.worseItems
        })
      } else if (newState.choice?.options.includes(id) === true) {
        newState.choice = createChoice(newState)
      }
      localStorage.setItem('state', JSON.stringify(newState))
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
    if (historyEvent.previousState == null) {
      const message = `There is no previous state for history event with id ${historyEventId}.`
      throw new Error(message)
    }
    setState(historyEvent.previousState)
    setHistory(current => {
      const index = current.findIndex(event => event.id === historyEventId)
      const newHistory = current.slice(0, index)
      localStorage.setItem('history', JSON.stringify(newHistory))
      return newHistory
    })
  }
  function createRandomMovieChoice (): void {

  }
  const defaultOptionIndex = state.choice == null
    ? undefined
    : getDefaultOptionIndex({
      items: state.activeItems,
      choice: state.choice
    })
  const value: MoviesContextValue = {
    ...state,
    applyChoice,
    choosing,
    createRandomMovieChoice,
    defaultOptionIndex,
    history,
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
