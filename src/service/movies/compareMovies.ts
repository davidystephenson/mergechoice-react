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
    if (a.updatedAt === b.updatedAt) {
      if (b.score === a.score) {
        return b.name.localeCompare(a.name) * -1
      }
      return b.score - a.score
    }
    return b.updatedAt - a.updatedAt
  }
  if (worseFirst) {
    return a.points - b.points
  }
  return b.points - a.points
}
