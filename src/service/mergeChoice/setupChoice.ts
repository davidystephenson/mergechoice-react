import createChoice from './createChoice'
import getOperationsSteps from './getOperationsSteps'
import getOperations from './getOperations'
import populate from './populate'
import sortItems from './sortItems'
import { Item, State } from './types'

export default function setupChoice <ListItem extends Item> (state: State<ListItem>): State<ListItem> {
  const maxSteps = getOperationsSteps({ operations: state.activeOperations })
  if (maxSteps > 0) {
    const newChoice = createChoice(state)
    return {
      ...state,
      choice: newChoice,
      finalized: false
    }
  } else {
    const newOperations = getOperations(state)
    const maxSteps = getOperationsSteps({ operations: newOperations })
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
        output: combinedItems.map(item => item.id)
      }]
      const combinedState: State<ListItem> = {
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
