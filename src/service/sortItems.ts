import { Movie, Operation } from '../types'
import compareItems from './compareItems'

export default function sortItems ({
  items,
  operations,
  worseFirst = false
}: {
  items: Movie[]
  operations: Operation[]
  worseFirst?: boolean
}): void {
  items.sort((a, b) => {
    return compareItems({ a, b, operations, worseFirst })
  })
}
