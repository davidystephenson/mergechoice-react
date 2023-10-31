import createChoice from './createChoice'
import getOperationsSteps from './getOperationsSteps'
import getOperations from './getOperations'
import populate from './populate'
import sortItems from './sortItems'
import { Item, State } from './types'
import getItem from './getItem'

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
        ids: state.worseIds,
        state,
        worseFirst: true
      })
      sortItems({
        ids: state.activeIds,
        state,
        worseFirst: true
      })
      sortItems({
        ids: state.betterIds,
        state,
        worseFirst: true
      })
      const combinedIds = [
        ...state.worseIds, ...state.activeIds, ...state.betterIds
      ]
      const combinedOperations = [{
        input: [[], []],
        output: combinedIds
      }]
      const combinedState: State<ListItem> = {
        ...state,
        activeIds: combinedIds,
        betterIds: [],
        worseIds: [],
        activeOperations: combinedOperations,
        choice: undefined,
        finalized: false
      }
      const reserveItems = state.reserveIds.map(id => getItem({ id, items: state.items }))
      const newState = populate({ items: reserveItems, state: combinedState })
      return newState
    }
  }
}
