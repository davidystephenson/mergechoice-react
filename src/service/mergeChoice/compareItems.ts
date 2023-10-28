import getPoints from './getPoints'
import { Item, State } from './types'

export default function compareItems <ListItem extends Item> ({
  a,
  b,
  state,
  worseFirst = false
}: {
  a: ListItem
  b: ListItem
  state: State<ListItem>
  worseFirst?: boolean
}): number {
  const aPoints = getPoints({ item: a, state })
  const bPoints = getPoints({ item: b, state })
  if (worseFirst) {
    return aPoints - bPoints
  }
  return bPoints - aPoints
}
