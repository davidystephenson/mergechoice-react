import { Item, ItemId } from './merge-choice-types'

export default function getItem <ListItem extends Item> ({ id, items }: {
  id: ItemId
  items: Record<string, ListItem>
}): ListItem {
  const item = items[id]
  if (item == null) {
    throw new Error(`Item ${id} not found`)
  }
  return item
}
