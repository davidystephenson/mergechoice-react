import createChoice from './createChoice'
import getShuffled from './getShuffled'
import { Item, State, ChoiceData } from './merge-choice-types'

export default function createRandomChoice <ListItem extends Item> (props: {
  state: State<ListItem>
}): State<ListItem> {
  const shuffledActiveIds = getShuffled(props.state.activeIds)
  const [first, second] = shuffledActiveIds
  const newChoiceData: ChoiceData = {
    options: [first, second],
    aIndex: 0,
    bIndex: 1,
    random: true
  }
  const newChoice = createChoice(newChoiceData)
  return {
    ...props.state,
    choice: newChoice,
    complete: false
  }
}
