import { Movie } from '../../types'

export default function findById ({ id, items }: {
  id: string
  items: Movie[]
}): Movie {
  const found = items.find(item => item.id === id)
  if (found == null) {
    throw new Error(`id ${id} not found in items`)
  }
  return found
}
