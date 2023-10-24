import { State, Choice } from '../types'
import getShuffled from './getShuffled'

export default function createRandomChoice ({
  state
}: {
  state: State
}): State {
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
