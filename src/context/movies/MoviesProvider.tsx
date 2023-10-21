import { ReactNode, useState } from 'react'
import { Movie, MoviesContextValue, HistoryEvent, Choice, State, Operation } from '../../types'
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
import getShuffled from '../../service/getShuffled'
import getPoints from '../../service/getPoints'
import getOperations from '../../service/getOperations'
import cloneLog from '../../service/clonelog'

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
    const bItem = findById({ items: state.activeItems, id: bId })
    const aPoints = getPoints({ item: aItem, ...state })
    const bPoints = getPoints({ item: bItem, ...state })
    if (state.choice.random) {
      setState(current => {
        const chosenItem = aBetter ? aItem : bItem
        const unchosenItem = aBetter ? bItem : aItem
        const chosenPoints = aBetter ? aPoints : bPoints
        const unchosenPoints = aBetter ? bPoints : aPoints
        const consistent = chosenPoints > unchosenPoints
        if (consistent) {
          return { ...current, finalized: true }
        }
        const betterItems = current.activeItems.filter(item => {
          const points = getPoints({ item, ...state })
          return points > unchosenPoints
        })
        const worseItems = current.activeItems.filter(item => {
          const points = getPoints({ item, ...state })
          return points < chosenPoints
        })
        const activeItems = current.activeItems.filter(item => {
          const points = getPoints({ item, ...state })
          return chosenPoints < points && points < unchosenPoints
        })
        const pairedChoice = activeItems.length === 0
        if (pairedChoice) {
          worseItems.push(unchosenItem)
          betterItems.unshift(chosenItem)
          const worseIds = worseItems.map(item => item.id)
          const betterIds = betterItems.map(item => item.id)
          const newOperation: Operation = {
            input: [[], []],
            output: [...worseIds, ...betterIds],
            steps: 0
          }
          const outputItems = [...worseItems, ...betterItems]
          const outputTitles = outputItems.map(item => item.title)
          console.log('outputTitles:', outputTitles)
          return {
            ...current,
            operations: [newOperation],
            finalized: true
          }
        }
        activeItems.push(chosenItem)
        activeItems.unshift(unchosenItem)
        cloneLog('activeItems', activeItems)
        console.log(`${chosenItem.title} > ${unchosenItem.title}`)
        const oldOutputItems = state.operations[0].output.map(id => findById({ id, items: state.activeItems }))
        const oldOutputTitles = oldOutputItems.map(item => item.title)
        console.log('oldOutputTitles:', oldOutputTitles)
        console.log('activeItems:', activeItems)
        const completedOperations = activeItems.map(item => ({
          input: [[], []],
          output: [item.id],
          steps: 0
        }))
        cloneLog('completedOperations', completedOperations)
        const betterOperation = {
          input: [[], []],
          output: betterItems.map(item => item.id),
          steps: 0
        }
        const worseOperation = {
          input: [[], []],
          output: worseItems.map(item => item.id),
          steps: 0
        }
        console.log('completedOperations:', completedOperations)
        const newState: State = {
          ...current,
          betterItems,
          worseItems,
          activeItems,
          operations: completedOperations,
          betterOperations: [betterOperation],
          worseOperations: [worseOperation],
          finalized: false
        }
        newState.operations = getOperations(newState)
        logOperations({
          label: 'newState.operations',
          operations: newState.operations,
          items: newState.activeItems
        })
        newState.choice = createChoice(newState)
        return newState
      })
      return
    }
    const newAPoints = aBetter ? aPoints + 1 : aPoints
    const aRecord = {
      ...aItem,
      points: newAPoints
    }
    const newBPoints = aBetter ? bPoints : bPoints + 1
    const bRecord = {
      ...bItem,
      points: newBPoints
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
      console.log('newOperationIds', newState.operations)
      logOperations({
        label: 'newOperations',
        operations: newState.operations,
        items: newState.activeItems
      })

      const emptiedCurrentOperation = emptiedOperationIndex === newState.choice?.currentOperationIndex
      if (emptiedCurrentOperation) {
        return setupChoice(newState)
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
    setState(current => {
      const shuffledActiveItems = getShuffled(current.activeItems)
      const [first, second] = shuffledActiveItems
      const newChoice: Choice = {
        options: [first.id, second.id],
        currentOperationIndex: -1,
        aIndex: 0,
        bIndex: 1,
        random: true
      }
      return {
        ...current,
        choice: newChoice,
        finalized: false
      }
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
