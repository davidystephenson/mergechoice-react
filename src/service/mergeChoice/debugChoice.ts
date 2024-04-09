import getItem from './getItem'
import { Choice, Item } from './mergeChoiceTypes'

export default function debugChoice <ListItem extends Item> ({ choice, items }: {
  choice: Choice
  items: Record<string, ListItem>
}): void {
  const choiceNames = choice.options.map(id => {
    const item = getItem({ itemId: id, items })
    return item.name
  })
  console.debug('choice items', choiceNames)
}
