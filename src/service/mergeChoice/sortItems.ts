import compareItems from './compareItems'
import { Item, State } from './types'

export default function sortItems <ListItem extends Item> ({
  ids,
  state,
  worseFirst = false
}: {
  ids: string[]
  state: State<ListItem>
  worseFirst?: boolean
}): void {
  ids.sort((aId, bId) => {
    return compareItems({
      aId,
      bId,
      state,
      worseFirst
    })
  })
}
