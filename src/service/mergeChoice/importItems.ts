import yeast from 'yeast'
import populate from './populate'
import { Item, State, HistoryEvent, CreateOperation } from './merge-choice-types'
import getShuffled from './getShuffled'
import asyncCreateYeastOperation from './asyncCreateYeastOperation'

export default async function importItems <ListItem extends Item> (props: {
  createOperation?: CreateOperation
  items: ListItem[]
  state: State<ListItem>
}): Promise<State<ListItem>> {
  const createOperation = props.createOperation ?? asyncCreateYeastOperation
  const shuffled = getShuffled(props.items)
  const { history, ...previousState } = props.state
  void history
  const population = await populate({
    items: shuffled,
    state: props.state,
    createOperation
  })
  const calculated = population.items.map(item => {
    return {
      ...item,
      points: 0
    }
  })
  const historyEvent: HistoryEvent<ListItem> = {
    createdAt: Date.now(),
    id: yeast(),
    import: {
      items: calculated
    },
    previousState
  }
  population.state.history.unshift(historyEvent)
  return population.state
}
