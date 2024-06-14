import chooseOption from './chooseOption'
import { HistoryChoiceData, Item, State } from './mergeChoiceTypes'

export default function restoreChoice<ListItem extends Item> (props: {
  data: HistoryChoiceData<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  if (props.data.seeded) {
    return props.state
  }
  const chosenState = chooseOption({
    state: props.state,
    betterIndex: props.data.betterIndex
  })
  return chosenState
}
