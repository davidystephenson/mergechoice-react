import { Choice, Item } from "../types"
import findById from "./findById"

export default function findByOption({
  choice,
  finalized,
  items,
  optionIndex
}: {
  choice: Choice
  finalized: boolean
  items: Item[]
  optionIndex: number
}): Item | undefined {
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