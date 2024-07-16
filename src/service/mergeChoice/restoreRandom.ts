import createRandomChoice from './createRandomChoice'
import { HistoryRandomData, Item, State } from './mergeChoiceTypes'

export default function restoreRandom<ListItem extends Item> (props: {
  input: HistoryRandomData<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  const randomState = createRandomChoice({
    firstItem: props.input.first,
    secondItem: props.input.second,
    state: props.state
  })
  return randomState
}
