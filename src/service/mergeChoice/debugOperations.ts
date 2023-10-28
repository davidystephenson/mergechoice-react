import { Movie, Operation } from '../../types'
import labelOperation from './labelOperation'

export default function debugOperations ({ label, items, operations }: {
  label: string
  items: Movie[]
  operations: Operation[]
}): void {
  const labeled = operations.map(operation => labelOperation({ items, operation }))
  console.debug(label, labeled)
}
