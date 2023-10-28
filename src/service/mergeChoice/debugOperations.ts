import labelOperation from './labelOperation'
import { Item, Operation } from './types'

export default function debugOperations <ListItem extends Item> ({ label, items, operations }: {
  label: string
  items: ListItem[]
  operations: Operation[]
}): void {
  const labeled = operations.map(operation => labelOperation({ items, operation }))
  console.debug(label, labeled)
}
