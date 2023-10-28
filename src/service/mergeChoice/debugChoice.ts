import findLabelById from './findLabelById'
import { Choice, Item } from './types'

export default function debugChoice <ListItem extends Item> ({ choice, items }: {
  choice: Choice
  items: ListItem[]
}): void {
  const choiceLabels = choice.options.map(id => {
    return findLabelById({ items, id })
  })
  console.debug('choice items', choiceLabels)
}
