import { Movie, Operation } from '../types'
import compareItems from './compareItems'

export default function sortItems ({
  activeItems,
  betterItems,
  betterOperations,
  items,
  operations,
  reserveItems,
  worseFirst = false,
  worseItems,
  worseOperations
}: {
  activeItems: Movie[]
  betterItems: Movie[]
  betterOperations: Operation[]
  items: Movie[]
  operations: Operation[]
  reserveItems: Movie[]
  worseFirst?: boolean
  worseItems: Movie[]
  worseOperations: Operation[]
}): void {
  items.sort((a, b) => {
    return compareItems({ a, activeItems, b, betterItems, betterOperations, operations, reserveItems, worseFirst, worseItems, worseOperations })
  })
}
