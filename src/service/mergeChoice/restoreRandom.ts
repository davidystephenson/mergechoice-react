import createRandomChoice from './createRandomChoice'
import { HistoryRandomData, Item, State } from './mergeChoiceTypes'

export default function restoreRandom<ListItem extends Item> (props: {
  data: HistoryRandomData<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  const randomState = createRandomChoice({
    firstItem: props.data.first,
    secondItem: props.data.second,
    state: props.state
  })
  return randomState
}
