import { ReactNode, useState } from 'react'
import { Item, ListContextValue, Review, State } from '../../types'
import listContext from './listContext'
import chooseOption from '../../service/chooseOption'
import getDefaultOptionIndex from '../../service/getDefaultOptionIndex'
import { STATE } from '../../constants'
import initializeState from '../../service/initializeState'

export default function ListProvider ({
  children
}: {
  children: ReactNode
}): JSX.Element {
  const [state, setState] = useState<State>(STATE)
  const [choosing] = useState(false)
  const [review, setReview] = useState<Review>()
  function populate ({ items }: {
    items: Item[]
  }): void {
    const initialState = initializeState({ items })
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
    setReview({ betterId, worseId })
    setState(current => {
      console.time('applyChoice')
      const newState = chooseOption({
        state: current, optionIndex
      })
      console.log('newState', newState)
      console.timeEnd('applyChoice')
      return newState
    })
  }
  const defaultOptionIndex = getDefaultOptionIndex(state)
  const value: ListContextValue = {
    applyChoice,
    choosing,
    defaultOptionIndex,
    populate,
    review,
    state
  }
  return (
    <listContext.Provider value={value}>
      {children}
    </listContext.Provider>
  )
}
