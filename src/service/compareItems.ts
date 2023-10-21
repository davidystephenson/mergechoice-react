import { Movie, Operation } from '../types'
import getPoints from './getPoints'

export default function compareItems ({
  a,
  activeItems,
  b,
  betterItems,
  betterOperations,
  operations,
  reserveItems,
  worseFirst = false,
  worseItems,
  worseOperations
}: {
  a: Movie
  activeItems: Movie[]
  b: Movie
  betterOperations: Operation[]
  betterItems: Movie[]
  operations: Operation[]
  reserveItems: Movie[]
  worseFirst?: boolean
  worseItems: Movie[]
  worseOperations: Operation[]
}): number {
  const aPoints = getPoints({ activeItems, item: a, betterItems, betterOperations, operations, reserveItems, worseItems, worseOperations })
  const bPoints = getPoints({ activeItems, item: b, betterItems, betterOperations, operations, reserveItems, worseItems, worseOperations })
  if (aPoints === bPoints) {
    // compare Date objects
    if (a.updatedAt === b.updatedAt) {
      if (b.score === a.score) {
        return b.title.localeCompare(a.title) * -1
      }
      return b.score - a.score
    }
    return b.updatedAt - a.updatedAt
  }
  if (worseFirst) {
    return aPoints - bPoints
  }
  return bPoints - aPoints
}
