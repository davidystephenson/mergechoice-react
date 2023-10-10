import { ReactNode, useState } from 'react'
import { Movie, MoviesContextValue, Review } from '../../types'
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

export default function MoviesProvider ({
  children
}: {
  children: ReactNode
}): JSX.Element {
  const [state, setState] = useState(() => {
    return getStorage({ key: 'state-reverse', defaultValue: STATE })
  })
  console.log('MoviesProvider state', state)
  const [choosing] = useState(false)
  const [review, setReview] = useState(() => {
    return getStorage<Review | undefined>({
      key: 'review-reverse', defaultValue: undefined
    })
  })
  function populate ({ movies }: {
    movies: Movie[]
  }): void {
    const initialState = initializeState({ items: movies })
    setState(initialState)
    setReview(undefined)
  }
  function applyChoice ({ optionIndex }: {
    optionIndex: number
  }): void {
    if (state.choice == null) {
      throw new Error('There is no choice.')
    }
    const betterId = state.choice.options[optionIndex]
    const leftBetter = optionIndex === state.choice.leftIndex
    const worseId = leftBetter
      ? state.choice.options[state.choice.rightIndex]
      : state.choice.options[state.choice.leftIndex]
    const newReview = { betterId, worseId }
    const betterItem = findById({ items: state.items, id: betterId })
    const worseItem = findById({ items: state.items, id: worseId })
    console.log(`${betterItem.title} > ${worseItem.title}`)
    // localStorage.setItem('review-reverse', JSON.stringify(newReview))
    setReview(newReview)
    setState(current => {
      const newState = chooseOption({
        state: current, betterIndex: optionIndex
      })
      // localStorage.setItem('state-reverse', JSON.stringify(newState))
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
      // localStorage.setItem('state-reverse', JSON.stringify(newState))
      return newState
    })
    setReview(current => {
      if (current?.betterId === id || current?.worseId === id) {
        return undefined
      }
      return current
    })
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
    movies: state.items,
    populate,
    removeMovie,
    review,
    state
  }
  return (
    <moviesContext.Provider value={value}>
      {children}
    </moviesContext.Provider>
  )
}
