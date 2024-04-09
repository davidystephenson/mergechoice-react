import getPoints from './getPoints'
import { Item, State } from './mergeChoiceTypes'

export default function compareItems <ListItem extends Item> ({
  aId,
  bId,
  state,
  worseFirst = false
}: {
  aId: number
  bId: number
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
