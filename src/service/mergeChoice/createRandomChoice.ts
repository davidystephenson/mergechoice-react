import getShuffled from './getShuffled'
import { Item, State, Choice } from './types'

export default function createRandomChoice <ListItem extends Item> ({
  state
}: {
  state: State<ListItem>
}): State<ListItem> {
  const shuffledActiveItems = getShuffled(state.activeItems)
  const [first, second] = shuffledActiveItems
  const newChoice: Choice = {
    options: [first.id, second.id],
    currentOperationIndex: -1,
    aIndex: 0,
    bIndex: 1,
    random: true
  }
  return {
    ...state,
    choice: newChoice,
    finalized: false
  }
}
