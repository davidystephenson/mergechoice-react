import yeast from 'yeast'
import clone from './clone'
import createChoice from './createChoice'
import getPoints from './getPoints'
import removeFromOperations from './removeFromOperations'
import setupChoice from './setupChoice'
import { Item, State, HistoryEvent, Calculated } from './types'
import getItem from './getItem'

export default function removeItem <ListItem extends Item> ({
  id,
  state
}: {
  id: string
  state: State<ListItem>
}): State<ListItem> {
  const item = getItem({ id, items: state.items })
  const statePoints = getPoints({ itemId: id, state })
  const historyItem: Calculated<ListItem> = { ...item, points: statePoints }
  const newState = clone(state)
  const { [id]: removedItem, ...newItems } = newState.items
  void removedItem
  newState.items = newItems
  newState.activeIds = newState.activeIds.filter(activeId => activeId !== id)
  newState.reserveIds = newState.reserveIds.filter(reserveId => reserveId !== id)
  newState.betterIds = newState.betterIds.filter(betterId => betterId !== id)
  newState.worseIds = newState.worseIds.filter(worseId => worseId !== id)
  const activeRemoval = removeFromOperations({
    itemId: id,
    operations: newState.activeOperations
  })
  newState.activeOperations = activeRemoval.operations
  newState.betterOperations = removeFromOperations({ itemId: id, operations: newState.betterOperations }).operations
  newState.worseOperations = removeFromOperations({ itemId: id, operations: newState.worseOperations }).operations
  const oldState = clone(state)
  const { history, ...previousState } = oldState
  void history
  const removeEvent: HistoryEvent<ListItem> = {
    createdAt: Date.now(),
    remove: {
      id,
      item: historyItem
    },
    id: yeast(),
    previousState
  }
  newState.history.unshift(removeEvent)

  const emptiedCurrentOperation = activeRemoval.emptiedOperationIndex === newState.choice?.currentOperationIndex
  if (emptiedCurrentOperation) {
    return setupChoice(newState)
  } else if (newState.choice?.options.includes(id) === true) {
    newState.choice = createChoice(newState)
  }
  return newState
}
