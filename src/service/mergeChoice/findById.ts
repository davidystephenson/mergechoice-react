import { Item } from './types'

export default function findById <ListItem extends Item> ({ id, items }: {
  id: string
  items: ListItem[]
}): ListItem {
  const found = items.find(item => item.id === id)
  if (found == null) {
    throw new Error(`id ${id} not found in items`)
  }
  return found
}
