import getPointsFromOperations from './getPointsFromOperations'
import { Item, State } from './types'

export default function getPoints <ListItem extends Item> ({
  itemId,
  state
}: {
  itemId: string
  state: State<ListItem>
}): number {
  const betterItem = state.betterIds.some(betterId => betterId === itemId)
  if (betterItem) {
    return getPointsFromOperations({ itemId, operations: state.betterOperations }) + state.activeIds.length + state.worseIds.length
  }
  const worseItem = state.worseIds.some(worseId => worseId === itemId)
  if (worseItem) {
    return getPointsFromOperations({ itemId, operations: state.worseOperations })
  }
  const reserveItem = state.reserveIds.some(reserveId => reserveId === itemId)
  if (reserveItem) {
    return 0
  }
  return getPointsFromOperations({ itemId, operations: state.activeOperations }) + state.worseIds.length
}
