import populate from './populate'
import { State, HistoryEvent, ItemData, Identified } from './mergeChoiceTypes'
import setupChoice from './setupChoice'
import createItem from './createItem'

export default function importItems <ListItemData extends ItemData> (props: {
  items: ListItemData[]
  state: State<Identified<ListItemData>>
}): State<Identified<ListItemData>> {
  if (props.state.choice?.random === true) {
    throw new Error('You cannot import during a random choice')
  }
  const { history, ...previousState } = props.state
  void history
  const items = props.items.map(item => {
    return createItem({
      item,
      state: props.state
    })
  })
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
  const historyEvent: HistoryEvent<Identified<ListItemData>> = {
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
