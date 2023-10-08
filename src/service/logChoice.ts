import { Choice, Movie } from "../types"
import findLabelById from "./findLabelById"

export default function logChoice({ choice, items }: {
  choice: Choice
  items: Movie[]
}): void {
  const choiceLabels = choice.options.map(id => {
    return findLabelById({ items, id })
  })
  console.log('choice items', choiceLabels)
}