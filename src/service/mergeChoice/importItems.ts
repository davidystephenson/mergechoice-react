import populate from './populate'
import { Item, State, HistoryEvent } from './merge-choice-types'
import getShuffled from './getShuffled'
import setupChoice from './setupChoice'

export default function importItems <ListItem extends Item> (props: {
  items: ListItem[]
  slice?: number
  state: State<ListItem>
}): State<ListItem> {
  const shuffled = getShuffled(props.items)
  const items = props.slice == null
    ? shuffled
    : shuffled.slice(0, props.slice)
  const { history, ...previousState } = props.state
  void history
  const population = populate({
    items,
    state: props.state
  })
  const calculated = population.items.map(item => {
    return {
      ...item,
      points: 0
    }
  })
  const setupState = setupChoice({
    state: population.state
  })
  const historyEvent: HistoryEvent<ListItem> = {
    createdAt: Date.now(),
    mergeChoiceId: setupState.history.length,
    import: {
      items: calculated
    },
    previousState
  }
  setupState.history.unshift(historyEvent)
  return setupState
}
