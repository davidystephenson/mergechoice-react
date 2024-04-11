import createActiveChoice from './createActiveChoice'
import getOperationsSteps from './getOperationsSteps'
import getOperations from './getOperations'
import populate from './populate'
import sortItems from './sortItems'
import { ChoiceSetup, Item, State } from './mergeChoiceTypes'
import getItem from './getItem'
import createOperation from './createOperation'

// TODO: Pass fresh flag in second order max steps 0 case
export default function setupChoice <ListItem extends Item> (props: {
  state: State<ListItem>
}): ChoiceSetup<ListItem> {
  const maxSteps1 = getOperationsSteps({ operations: props.state.activeOperations })
  console.log('maxSteps', maxSteps1)
  if (maxSteps1 > 0) {
    console.log('basic choice')
    const newChoice = createActiveChoice({
      state: props.state
    })
    const newState = {
      ...props.state,
      choice: newChoice,
      complete: false
    }
    const choiceSetup = {
      state: newState,
      fresh: false
    }
    return choiceSetup
  } else {
    const newState = { ...props.state }
    const newOperations = getOperations({
      activeOperations: props.state.activeOperations,
      debug: true,
      state: newState
    })
    const maxSteps2 = getOperationsSteps({ operations: newOperations })
    if (maxSteps2 > 0) {
      newState.activeOperations = newOperations
      const nextChoice = createActiveChoice({
        state: newState
      })
      newState.choice = nextChoice
      newState.complete = false
      const choiceSetup = {
        state: newState,
        fresh: true
      }
      return choiceSetup
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
      const reserveItems = props.state.reserveIds.map(itemId => getItem({ itemId, items: props.state.items }))
      const population = populate({
        items: reserveItems,
        state: newState
      })
      const choiceSetup = {
        state: population.state,
        fresh: false
      }
      return choiceSetup
    }
  }
}
