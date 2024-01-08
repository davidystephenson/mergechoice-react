import labelOperation from './labelOperation'
import { Item, Operation } from './merge-choice-types'

export default function debugOperations <ListItem extends Item> ({ label, items, operations }: {
  label: string
  items: Record<string, ListItem>
  operations: Operation[]
}): void {
  const labeled = operations.map(operation => labelOperation({ items, operation }))
  console.debug(label, labeled)
}
