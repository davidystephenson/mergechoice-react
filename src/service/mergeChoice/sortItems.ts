import { Movie, State } from '../../types'
import compareItems from './compareItems'

export default function sortItems ({
  items,
  state,
  worseFirst = false
}: {
  items: Movie[]
  state: State
  worseFirst?: boolean
}): void {
  items.sort((a, b) => {
    return compareItems({
      a,
      b,
      state,
      worseFirst
    })
  })
}
