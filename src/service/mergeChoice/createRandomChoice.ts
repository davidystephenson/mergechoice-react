import getShuffled from './getShuffled'
import { Item, State, Choice } from './types'

export default function createRandomChoice <ListItem extends Item> ({
  state
}: {
  state: State<ListItem>
}): State<ListItem> {
  const shuffledActiveIds = getShuffled(state.activeIds)
  const [first, second] = shuffledActiveIds
  const newChoice: Choice = {
    options: [first, second],
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
