import { Movie, State } from '../types'
import getPointsFromOperations from './getPointsFromOperations'

export default function getPoints ({
  item,
  state
}: {
  item: Movie
  state: State
}): number {
  const betterItem = state.betterItems.some(betterItem => betterItem.id === item.id)
  if (betterItem) {
    return getPointsFromOperations({ itemId: item.id, operations: state.betterOperations }) + state.activeItems.length + state.worseItems.length
  }
  const worseItem = state.worseItems.some(worseItem => worseItem.id === item.id)
  if (worseItem) {
    return getPointsFromOperations({ itemId: item.id, operations: state.worseOperations })
  }
  const reserveItem = state.reserveItems.some(reserveItem => reserveItem.id === item.id)
  if (reserveItem) {
    return 0
  }
  return getPointsFromOperations({ itemId: item.id, operations: state.activeOperations }) + state.worseItems.length
}
