import { Movie } from '../../types'
import findById from './findById'

export default function findLabelById ({ id, items }: {
  id: string
  items: Movie[]
}): string {
  return findById({ items, id }).title
}
