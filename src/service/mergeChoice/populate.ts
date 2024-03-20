import createState from './createState'
import createActiveChoice from './createActiveChoice'
import getOperationsSteps from './getOperationsSteps'
import getOperations from './getOperations'
import { Item, Population, State } from './merge-choice-types'
import getItem from './getItem'
import arrayToDictionary from './arrayToDictionary'
import createOperation from './createOperation'

export default function populate <ListItem extends Item> (props: {
  items: ListItem[]
  state: State<ListItem>
}): Population<ListItem> {
  const newItems = props.items.filter(item => {
    try {
      getItem({ id: item.id, items: props.state.items })
      return false
    } catch (error) {
      return true
    }
  })

  const newIds = newItems.map(item => item.id)
  if (
    props.state.complete ||
    (props.state.betterIds.length === 0 && props.state.worseIds.length === 0 && props.state.choice?.random !== true)
  ) {
    const newState: State<ListItem> = createState()
    for (const id in props.state.items) {
      newState.items[id] = props.state.items[id]
    }
    newItems.forEach(item => {
      newState.items[item.id] = item
    })
    newState.history = props.state.history
    newState.activeIds = newIds
    const activeOperationArray = newState.activeIds.map(id => {
      const output = [id]
      const operation = createOperation({ output, state: newState })
      return operation
    })
    const activeOperationDictionary = arrayToDictionary({ array: activeOperationArray })
    newState.activeOperations = activeOperationDictionary
    newState.activeIds.push(...props.state.activeIds)
    const newActiveOperations = getOperations({
      activeOperations: newState.activeOperations,
      state: newState
    })
    newState.activeOperations = newActiveOperations
    newState.activeOperations = {
      ...newState.activeOperations,
      ...props.state.activeOperations
    }
    const maxSteps = getOperationsSteps({ operations: newState.activeOperations })
    if (maxSteps === 0) {
      newState.complete = true
      return { state: newState, items: newItems }
    }
    newState.choice = createActiveChoice({
      state: newState
    })
    return { state: newState, items: newItems }
  }
  newItems.forEach(item => {
    props.state.items[item.id] = item
  })
  props.state.reserveIds.push(...newIds)
  return { state: props.state, items: newItems }
}
