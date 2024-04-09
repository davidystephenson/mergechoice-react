import { Item } from './mergeChoiceTypes'

export default function getItem <ListItem extends Item> ({ itemId: id, items }: {
  itemId: number
  items: Record<string, ListItem>
}): ListItem {
  const item = items[id]
  if (item == null) {
    throw new Error(`Item ${id} not found`)
  }
  return item
}
