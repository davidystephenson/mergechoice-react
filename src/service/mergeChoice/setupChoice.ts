import createActiveChoice from './createActiveChoice'
import getOperationsSteps from './getOperationsSteps'
import getOperations from './getOperations'
import populate from './populate'
import sortItems from './sortItems'
import { Item, State } from './mergeChoiceTypes'
import getItem from './getItem'
import createOperation from './createOperation'

export default function setupChoice <ListItem extends Item> (props: {
  state: State<ListItem>
}): State<ListItem> {
  const maxSteps = getOperationsSteps({ operations: props.state.activeOperations })
  if (maxSteps > 0) {
    const newChoice = createActiveChoice({
      state: props.state
    })
    return {
      ...props.state,
      choice: newChoice,
      complete: false
    }
  } else {
    const newState = { ...props.state }
    const newOperations = getOperations({
      activeOperations: props.state.activeOperations,
      state: newState
    })
    const maxSteps = getOperationsSteps({ operations: newOperations })
    if (maxSteps > 0) {
      newState.activeOperations = newOperations
      const nextChoice = createActiveChoice({
        state: newState
      })
      newState.choice = nextChoice
      newState.complete = false
      return newState
    } else {
      sortItems({
        ids: newState.worseIds,
        state: newState,
        worseFirst: true
      })
      sortItems({
        ids: newState.activeIds,
        state: newState,
        worseFirst: true
      })
      sortItems({
        ids: newState.betterIds,
        state: newState,
        worseFirst: true
      })
      const combinedIds = [
        ...newState.worseIds, ...newState.activeIds, ...newState.betterIds
      ]
      const combinedOperation = createOperation({
        output: combinedIds,
        state: newState
      })
      const combinedOperations = { [combinedOperation.mergeChoiceId]: combinedOperation }
      newState.activeIds = combinedIds
      newState.betterIds = []
      newState.worseIds = []
      newState.activeOperations = combinedOperations
      newState.choice = undefined
      newState.complete = false
      const reserveItems = props.state.reserveIds.map(id => getItem({ itemId: id, items: props.state.items }))
      const population = populate({
        items: reserveItems,
        state: newState
      })
      return population.state
    }
  }
}
