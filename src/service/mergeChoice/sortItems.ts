import compareItems from './compareItems'
import { Item, State } from './types'

export default function sortItems <ListItem extends Item> ({
  items,
  state,
  worseFirst = false
}: {
  items: ListItem[]
  state: State<ListItem>
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
