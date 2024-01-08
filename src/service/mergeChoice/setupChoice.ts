import createActiveChoice from './createActiveChoice'
import getOperationsSteps from './getOperationsSteps'
import getOperations from './getOperations'
import populate from './populate'
import sortItems from './sortItems'
import { CreateChoice, CreateOperation, Item, State } from './merge-choice-types'
import getItem from './getItem'

export default async function setupChoice <ListItem extends Item> (props: {
  createChoice: CreateChoice
  createOperation: CreateOperation
  state: State<ListItem>
}): Promise<State<ListItem>> {
  const maxSteps = getOperationsSteps({ operations: props.state.activeOperations })
  if (maxSteps > 0) {
    const newChoice = await createActiveChoice({
      activeOperations: props.state.activeOperations,
      createChoice: props.createChoice
    })
    return {
      ...props.state,
      choice: newChoice,
      finalized: false
    }
  } else {
    const newOperations = await getOperations({
      activeOperations: props.state.activeOperations,
      createOperation: props.createOperation
    })
    const maxSteps = getOperationsSteps({ operations: newOperations })
    if (maxSteps > 0) {
      const nextChoice = await createActiveChoice({
        activeOperations: newOperations,
        createChoice: props.createChoice
      })
      return {
        ...props.state,
        activeOperations: newOperations,
        choice: nextChoice,
        finalized: false
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
      const combinedOperation = await props.createOperation({
        output: combinedIds
      })
      const combinedOperations = [combinedOperation]
      const combinedState: State<ListItem> = {
        ...props.state,
        activeIds: combinedIds,
        betterIds: [],
        worseIds: [],
        activeOperations: combinedOperations,
        choice: undefined,
        finalized: false
      }
      const reserveItems = props.state.reserveIds.map(id => getItem({ id, items: props.state.items }))
      const population = await populate({
        createChoice: props.createChoice,
        createOperation: props.createOperation,
        items: reserveItems,
        state: combinedState
      })
      return population.state
    }
  }
}
