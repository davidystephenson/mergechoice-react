import labelOperation from './labelOperation'
import { Item, OperationDictionary } from './merge-choice-types'

export default function debugOperations <ListItem extends Item> ({ label, items, operations }: {
  label: string
  items: Record<string, ListItem>
  operations: OperationDictionary
}): void {
  const labeled = Object.values(operations).map(operation => labelOperation({ items, operation }))
  console.debug(label, labeled)
}
