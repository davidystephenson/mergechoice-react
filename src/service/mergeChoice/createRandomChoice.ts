import createChoice from './createChoice'
import getRandomElement from './getRandomElement'
import { Item, State, ChoiceData } from './merge-choice-types'

export default function createRandomChoice <ListItem extends Item> (props: {
  state: State<ListItem>
}): State<ListItem> {
  const first = getRandomElement({ seed: props.state.seed, array: props.state.activeIds })
  const second = getRandomElement({ seed: props.state.seed, array: props.state.activeIds })
  const newChoiceData: ChoiceData = {
    options: [first, second],
    aIndex: 0,
    bIndex: 1,
    random: true
  }
  const newChoice = createChoice({
    choice: newChoiceData,
    state: props.state
  })
  return {
    ...props.state,
    choice: newChoice,
    complete: false
  }
}
