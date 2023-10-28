import yeast from 'yeast'
import { HistoryEvent, HistoryMovie, State } from '../../types'
import clone from './clone'
import createChoice from './createChoice'
import findById from './findById'
import getPoints from './getPoints'
import removeFromOperations from './removeFromOperations'
import setupChoice from './setupChoice'

export default function removeItem ({
  id,
  state
}: {
  id: string
  state: State
}): State {
  const stateItems = [...state.activeItems, ...state.betterItems, ...state.worseItems, ...state.reserveItems]
  const item = findById({ items: stateItems, id })
  const statepoints = getPoints({ item, state })
  const historyItem: HistoryMovie = { ...item, points: statepoints }
  const newState = clone(state)
  newState.activeItems = newState.activeItems.filter(item => item.id !== id)
  newState.reserveItems = newState.reserveItems.filter(item => item.id !== id)
  newState.betterItems = newState.betterItems.filter(item => item.id !== id)
  newState.worseItems = newState.worseItems.filter(item => item.id !== id)
  const activeRemoval = removeFromOperations({
    itemId: id,
    operations: newState.activeOperations
  })
  newState.activeOperations = activeRemoval.operations
  newState.betterOperations = removeFromOperations({ itemId: id, operations: newState.betterOperations }).operations
  newState.worseOperations = removeFromOperations({ itemId: id, operations: newState.worseOperations }).operations
  const removeEvent: HistoryEvent = {
    createdAt: Date.now(),
    remove: {
      id,
      item: historyItem
    },
    id: yeast(),
    previousState: clone(state)
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
