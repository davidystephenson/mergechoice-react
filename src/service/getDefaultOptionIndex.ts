import { Choice, Item } from "../types"
import findById from "./findById"

export default function getDefaultOptionIndex ({
  choice,
  items
}: {
  choice: Choice
  items: Item[]
}): number | undefined {
  if (choice.options.length == 0) {
    return undefined
  }
  const choiceItems = choice.options.map(option => {
    return findById({
      items,
      id: option
    })
  })
  const [firstItem, secondItem] = choiceItems
  const defaultItem = firstItem.score === secondItem.score
    ? undefined 
    : firstItem.score > secondItem.score
      ? firstItem
      : secondItem
  const defaultOptionIndex = choice.options.findIndex(option => {
    return option === defaultItem?.id
  })
  if (defaultOptionIndex === -1) {
    return undefined
  }
  return defaultOptionIndex
}