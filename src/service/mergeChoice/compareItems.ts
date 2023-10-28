import { Movie, State } from '../../types'
import getPoints from './getPoints'

export default function compareItems ({
  a,
  b,
  state,
  worseFirst = false
}: {
  a: Movie
  b: Movie
  state: State
  worseFirst?: boolean
}): number {
  const aPoints = getPoints({ item: a, state })
  const bPoints = getPoints({ item: b, state })
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
