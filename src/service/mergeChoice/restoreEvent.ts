import chooseOption from './chooseOption'
import createRandomChoice from './createRandomChoice'
import importItems from './importItems'
import { HistoryEvent, State, Item } from './mergeChoiceTypes'
import removeItem from './removeItem'
import resetItem from './resetItem'

export default function restoreEvent<ListItem extends Item> (props: {
  event: HistoryEvent<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  if (props.event.choice != null) {
    const chosenState = chooseOption({
      state: props.state,
      betterIndex: props.event.choice.betterIndex
    })
    return chosenState
  }
  if (props.event.import != null) {
    const importedState = importItems({
      items: props.event.import.items,
      state: props.state
    })
    return importedState
  }
  if (props.event.random != null) {
    const randomState = createRandomChoice({
      firstItem: props.event.random.first,
      secondItem: props.event.random.second,
      state: props.state
    })
    return randomState
  }
  if (props.event.remove != null) {
    const removedState = removeItem({
      itemId: props.event.remove.item.id,
      state: props.state
    })
    return removedState
  }
  if (props.event.reset != null) {
    const resetState = resetItem({
      itemId: props.event.reset.item.id,
      state: props.state
    })
    return resetState
  }
  throw new Error('Unknown event type')
}
