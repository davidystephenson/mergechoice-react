import yeast from 'yeast'
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
  const oldState = JSON.parse(JSON.stringify(state))
  const { [id]: removedItem, ...newItems } = state.items
  void removedItem
  state.items = newItems
  state.activeIds = state.activeIds.filter(activeId => activeId !== id)
  state.reserveIds = state.reserveIds.filter(reserveId => reserveId !== id)
  state.betterIds = state.betterIds.filter(betterId => betterId !== id)
  state.worseIds = state.worseIds.filter(worseId => worseId !== id)
  const activeRemoval = removeFromOperations({
    itemId: id,
    operations: state.activeOperations
  })
  state.activeOperations = activeRemoval.operations
  state.betterOperations = removeFromOperations({ itemId: id, operations: state.betterOperations }).operations
  state.worseOperations = removeFromOperations({ itemId: id, operations: state.worseOperations }).operations
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
  state.history.unshift(removeEvent)

  const emptiedCurrentOperation = activeRemoval.emptiedOperationIndex === state.choice?.currentOperationIndex
  if (emptiedCurrentOperation) {
    return setupChoice(state)
  } else if (state.choice?.options.includes(id) === true) {
    state.choice = createChoice(state)
  }
  return state
}
