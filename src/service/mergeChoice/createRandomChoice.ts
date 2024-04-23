import createChoice from './createChoice'
import { Item, State, ChoiceData, Calculated } from './mergeChoiceTypes'

export default function createRandomChoice <ListItem extends Item> (props: {
  state: State<ListItem>
  firstItem: Calculated<ListItem>
  secondItem: Calculated<ListItem>
}): State<ListItem> {
  const newChoiceData: ChoiceData = {
    aIndex: 0,
    bIndex: 1,
    options: [props.firstItem.id, props.secondItem.id],
    random: true
  }
  const newChoice = createChoice({
    choice: newChoiceData,
    state: props.state
  })
  const historyEvent = {
    createdAt: Date.now(),
    mergeChoiceId: props.state.history.length,
    random: {
      first: props.firstItem,
      second: props.secondItem
    }
  }
  props.state.history.unshift(historyEvent)
  return {
    ...props.state,
    choice: newChoice,
    complete: false
  }
}
