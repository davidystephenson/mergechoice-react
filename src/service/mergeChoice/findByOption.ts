import findById from './findById'
import { Choice, Item } from './types'

export default function findByOption <ListItem extends Item> ({
  choice,
  finalized,
  items,
  optionIndex
}: {
  choice: Choice
  finalized: boolean
  items: ListItem[]
  optionIndex: number
}): ListItem | undefined {
  if (finalized) {
    return undefined
  }
  const itemId = choice.options[optionIndex]
  if (itemId == null) {
    return undefined
  }
  const item = findById({
    items, id: itemId
  })
  return item
}
