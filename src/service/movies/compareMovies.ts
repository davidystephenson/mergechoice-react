import { CalculatedMovie } from '../../types'

export default function compareItems ({
  a,
  b,
  worseFirst = false
}: {
  a: CalculatedMovie
  b: CalculatedMovie
  worseFirst?: boolean
}): number {
  if (a.points === b.points) {
    if (b.score === a.score) {
      if (a.updatedAt === b.updatedAt) {
        return b.name.localeCompare(a.name) * -1
      }
      return b.updatedAt - a.updatedAt
    }
    if (worseFirst) {
      return a.score - b.score
    }
    return b.score - a.score
  }
  if (worseFirst) {
    return a.points - b.points
  }
  return b.points - a.points
}
