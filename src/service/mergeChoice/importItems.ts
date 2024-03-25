import populate from './populate'
import { Item, State, HistoryEvent } from './merge-choice-types'
import setupChoice from './setupChoice'

export default function importItems <ListItem extends Item> (props: {
  items: ListItem[]
  state: State<ListItem>
}): State<ListItem> {
  if (props.state.choice?.random === true) {
    throw new Error('You cannot import during a random choice')
  }
  const { history, ...previousState } = props.state
  void history
  const population = populate({
    items: props.items,
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
