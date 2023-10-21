import { Movie, Operation } from '../types'
import getPointsFromOperations from './getPointsFromOperations'

export default function getPoints ({
  activeItems,
  betterItems,
  betterOperations,
  item,
  operations,
  reserveItems,
  worseItems,
  worseOperations
}: {
  activeItems: Movie[]
  betterItems: Movie[]
  betterOperations: Operation[]
  item: Movie
  operations: Operation[]
  reserveItems: Movie[]
  worseItems: Movie[]
  worseOperations: Operation[]
}): number {
  const betterItem = betterItems.some(betterItem => betterItem.id === item.id)
  if (betterItem) {
    return getPointsFromOperations({ itemId: item.id, operations: betterOperations }) + activeItems.length + worseItems.length
  }
  const worseItem = worseItems.some(worseItem => worseItem.id === item.id)
  if (worseItem) {
    return getPointsFromOperations({ itemId: item.id, operations: worseOperations })
  }
  const reserveItem = reserveItems.some(reserveItem => reserveItem.id === item.id)
  if (reserveItem) {
    return 0
  }
  return getPointsFromOperations({ itemId: item.id, operations }) + worseItems.length
}
