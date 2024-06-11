import chooseOption from './chooseOption'
import { HistoryEvent, Item, State } from './mergeChoiceTypes'

export default function restoreChoice<ListItem extends Item> (props: {
  event: HistoryEvent<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  if (props.event.choice == null) {
    throw new Error('There is no choice')
  }
  if (props.event.choice.seeded) {
    return props.state
  }
  const chosenState = chooseOption({
    state: props.state,
    betterIndex: props.event.choice.betterIndex
  })
  return chosenState
}
