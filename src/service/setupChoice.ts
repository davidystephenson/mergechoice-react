import { State } from '../types'
import createChoice from './createChoice'
import getOperations from './getOperations'
import populate from './populate'
import sortItems from './sortItems'

export default function setupChoice (state: State): State {
  const maxSteps = Math.max(...state.activeOperations.map(operation => operation.steps))
  if (maxSteps > 0) {
    const newChoice = createChoice(state)
    return {
      ...state,
      choice: newChoice,
      finalized: false
    }
  } else {
    const newOperations = getOperations(state)
    const maxSteps = Math.max(...newOperations.map(operation => operation.steps))
    if (maxSteps > 0) {
      const nextChoice = createChoice({
        activeOperations: newOperations
      })
      return {
        ...state,
        activeOperations: newOperations,
        choice: nextChoice,
        finalized: false
      }
    } else {
      sortItems({
        items: state.worseItems,
        state,
        worseFirst: true
      })
      sortItems({
        items: state.activeItems,
        state,
        worseFirst: true
      })
      sortItems({
        items: state.betterItems,
        state,
        worseFirst: true
      })
      const combinedItems = [
        ...state.worseItems, ...state.activeItems, ...state.betterItems
      ]
      const combinedOperations = [{
        input: [[], []],
        output: combinedItems.map(item => item.id),
        steps: 0
      }]
      const combinedState: State = {
        ...state,
        activeItems: combinedItems,
        betterItems: [],
        worseItems: [],
        activeOperations: combinedOperations,
        choice: undefined,
        finalized: false
      }
      const newState = populate({ items: state.reserveItems, state: combinedState })
      return newState
    }
  }
}
