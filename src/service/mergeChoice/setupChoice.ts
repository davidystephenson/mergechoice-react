import createActiveChoice from './createActiveChoice'
import getOperationsSteps from './getOperationsSteps'
import getOperations from './getOperations'
import populate from './populate'
import sortItems from './sortItems'
import { Item, State } from './merge-choice-types'
import getItem from './getItem'
import createOperation from './createOperation'

export default function setupChoice <ListItem extends Item> (props: {
  state: State<ListItem>
}): State<ListItem> {
  const maxSteps = getOperationsSteps({ operations: props.state.activeOperations })
  if (maxSteps > 0) {
    const newChoice = createActiveChoice({
      activeOperations: props.state.activeOperations
    })
    return {
      ...props.state,
      choice: newChoice,
      complete: false
    }
  } else {
    const newOperations = getOperations({
      activeOperations: props.state.activeOperations
    })
    const maxSteps = getOperationsSteps({ operations: newOperations })
    if (maxSteps > 0) {
      const nextChoice = createActiveChoice({
        activeOperations: newOperations
      })
      return {
        ...props.state,
        activeOperations: newOperations,
        choice: nextChoice,
        complete: false
      }
    } else {
      sortItems({
        ids: props.state.worseIds,
        state: props.state,
        worseFirst: true
      })
      sortItems({
        ids: props.state.activeIds,
        state: props.state,
        worseFirst: true
      })
      sortItems({
        ids: props.state.betterIds,
        state: props.state,
        worseFirst: true
      })
      const combinedIds = [
        ...props.state.worseIds, ...props.state.activeIds, ...props.state.betterIds
      ]
      const combinedOperation = createOperation({
        output: combinedIds
      })
      const combinedOperations = { [combinedOperation.mergeChoiceId]: combinedOperation }
      const combinedState: State<ListItem> = {
        ...props.state,
        activeIds: combinedIds,
        betterIds: [],
        worseIds: [],
        activeOperations: combinedOperations,
        choice: undefined,
        complete: false
      }
      const reserveItems = props.state.reserveIds.map(id => getItem({ id, items: props.state.items }))
      const population = populate({
        items: reserveItems,
        state: combinedState
      })
      return population.state
    }
  }
}
