import STATE from './STATE'
import createChoice from './createChoice'
import getOperationsSteps from './getOperationsSteps'
import getOperations from './getOperations'
import { CreateOperation, Item, Population, State } from './merge-choice-types'
import getItem from './getItem'

export default async function populate <ListItem extends Item> (props: {
  items: ListItem[]
  state: State<ListItem>
  createOperation: CreateOperation
}): Promise<Population<ListItem>> {
  const newItems = props.items.filter(item => {
    try {
      getItem({ id: item.id, items: props.state.items })
      return false
    } catch (error) {
      return true
    }
  })
  console.log('newItems', newItems)

  const newIds = newItems.map(item => item.id)
  if (
    props.state.finalized ||
    (props.state.betterIds.length === 0 && props.state.worseIds.length === 0 && props.state.choice?.random !== true)
  ) {
    const newState: State<ListItem> = STATE()
    for (const id in props.state.items) {
      newState.items[id] = props.state.items[id]
    }
    newItems.forEach(item => {
      newState.items[item.id] = item
    })
    newState.history = props.state.history
    newState.activeIds = newIds
    const activeOperationPromises = newState.activeIds.map(async id => {
      const output = [id]
      const operation = await props.createOperation({ output })
      return operation
    })
    newState.activeOperations = await Promise.all(activeOperationPromises)
    newState.activeIds.push(...props.state.activeIds)
    newState.activeOperations = await getOperations({ ...newState, createOperation: props.createOperation })
    newState.activeOperations.push(...props.state.activeOperations)
    const maxSteps = getOperationsSteps({ operations: newState.activeOperations })
    if (maxSteps === 0) {
      newState.finalized = true
      return { state: newState, items: newItems }
    }
    newState.choice = createChoice(newState)
    return { state: newState, items: newItems }
  }
  newItems.forEach(item => {
    props.state.items[item.id] = item
  })
  props.state.reserveIds.push(...newIds)
  return { state: props.state, items: newItems }
}
