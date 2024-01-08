import getPoints from './getPoints'
import { Id, Item, State } from './merge-choice-types'

export default function compareItems <ListItem extends Item> ({
  aId,
  bId,
  state,
  worseFirst = false
}: {
  aId: Id
  bId: Id
  state: State<ListItem>
  worseFirst?: boolean
}): number {
  const aPoints = getPoints({ itemId: aId, state })
  const bPoints = getPoints({ itemId: bId, state })
  if (worseFirst) {
    return aPoints - bPoints
  }
  return bPoints - aPoints
}
