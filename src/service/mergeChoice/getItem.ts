import { Item } from './types'

export default function getItem <ListItem extends Item> ({ id, items }: {
  id: string
  items: Record<string, ListItem>
}): ListItem {
  const item = items[id]
  if (item == null) {
    throw new Error(`Item ${id} not found`)
  }
  return item
}
