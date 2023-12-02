import STATE from './STATE'
import createChoice from './createChoice'
import getOperationsSteps from './getOperationsSteps'
import getOperations from './getOperations'
import { Item, Population, State } from './types'
import getItem from './getItem'

export default function populate <ListItem extends Item> ({ items, state }: {
  items: ListItem[]
  state: State<ListItem>
}): Population<ListItem> {
  console.log('items', items)
  const newItems = items.filter(item => {
    try {
      getItem({ id: item.id, items: state.items })
      return false
    } catch (error) {
      return true
    }
  })
  console.log('newItems', newItems)

  const newIds = newItems.map(item => item.id)
  if (state.finalized || (state.betterIds.length === 0 && state.worseIds.length === 0 && state.choice?.random !== true)) {
    const newState: State<ListItem> = STATE()
    for (const id in state.items) {
      newState.items[id] = state.items[id]
    }
    newItems.forEach(item => {
      newState.items[item.id] = item
    })
    newState.history = state.history
    newState.activeIds = newIds
    newState.activeOperations = newState.activeIds.map(id => ({
      input: [[], []],
      output: [id]
    }))
    newState.activeIds.push(...state.activeIds)
    newState.activeOperations = getOperations(newState)
    newState.activeOperations.push(...state.activeOperations)
    const maxSteps = getOperationsSteps({ operations: newState.activeOperations })
    if (maxSteps === 0) {
      newState.finalized = true
      return { state: newState, items: newItems }
    }
    newState.choice = createChoice(newState)
    return { state: newState, items: newItems }
  }
  newItems.forEach(item => {
    state.items[item.id] = item
  })
  state.reserveIds.push(...newIds)
  return { state, items: newItems }
}
