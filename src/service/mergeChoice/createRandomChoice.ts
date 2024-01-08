import getShuffled from './getShuffled'
import { Item, State, Choice } from './merge-choice-types'

export default function createRandomChoice <ListItem extends Item> ({
  state
}: {
  state: State<ListItem>
}): State<ListItem> {
  const shuffledActiveIds = getShuffled(state.activeIds)
  const [first, second] = shuffledActiveIds
  const newChoice: Choice = {
    options: [first, second],
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
