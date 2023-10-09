import { Movie } from '../types'

export default function compareMovies (a: Movie, b: Movie): number {
  if (b.points === a.points) {
    // compare Date objects
    if (a.updatedAt === b.updatedAt) {
      if (b.score === a.score) {
        return b.title.localeCompare(a.title) * -1
      }
      return b.score - a.score
    }
    return b.updatedAt - a.updatedAt
  }
  return b.points - a.points
}
