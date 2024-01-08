import compareItems from './compareItems'
import { Id, Item, State } from './merge-choice-types'

export default function sortItems <ListItem extends Item> ({
  ids,
  state,
  worseFirst = false
}: {
  ids: Id[]
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
