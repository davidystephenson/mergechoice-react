import { ReactNode, useState } from 'react'
import { Movie, MoviesContextValue, Review } from '../../types'
import moviesContext from './moviesContext'
import chooseOption from '../../service/chooseOption'
import getDefaultOptionIndex from '../../service/getDefaultOptionIndex'
import { STATE } from '../../constants'
import initializeState from '../../service/initializeState'
import getStorage from '../../service/getStorage'

export default function MoviesProvider ({
  children
}: {
  children: ReactNode
}): JSX.Element {
  const [state, setState] = useState(() => {
    return getStorage({ key: 'state', defaultValue: STATE })
  })
  const [choosing] = useState(false)
  const [review, setReview] = useState(() => {
    return getStorage<Review | undefined>({
      key: 'review', defaultValue: undefined
    })
  })
  function populate ({ movies }: {
    movies: Movie[]
  }): void {
    const initialState = initializeState({ items: movies })
    setState(initialState)
  }
  function applyChoice ({ optionIndex }: {
    optionIndex: number
  }): void {
    const betterId = state.choice.options[optionIndex]
    const leftBetter = optionIndex === state.choice.leftIndex
    const worseId = leftBetter
      ? state.choice.options[state.choice.rightIndex]
      : state.choice.options[state.choice.leftIndex]
    const newReview = { betterId, worseId }
    localStorage.setItem('review', JSON.stringify(newReview))
    setReview(newReview)
    setState(current => {
      console.time('applyChoice')
      const newState = chooseOption({
        state: current, optionIndex
      })
      console.log('newState', newState)
      localStorage.setItem('state', JSON.stringify(newState))
      console.timeEnd('applyChoice')
      return newState
    })
  }
  const defaultOptionIndex = getDefaultOptionIndex({
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
    review,
    state
  }
  return (
    <moviesContext.Provider value={value}>
      {children}
    </moviesContext.Provider>
  )
}
