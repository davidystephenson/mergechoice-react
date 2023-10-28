import findById from './findById'
import { Item } from './types'

export default function findLabelById <ListItem extends Item> ({ id, items }: {
  id: string
  items: ListItem[]
}): string {
  return findById({ items, id }).name
}
