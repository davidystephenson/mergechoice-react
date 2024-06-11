import createRandomChoice from './createRandomChoice'
import { HistoryEvent, Item, State } from './mergeChoiceTypes'

export default function restoreRandom<ListItem extends Item> (props: {
  event: HistoryEvent<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  if (props.event.random == null) {
    throw new Error('There is no random')
  }
  const randomState = createRandomChoice({
    firstItem: props.event.random.first,
    secondItem: props.event.random.second,
    state: props.state
  })
  return randomState
}
