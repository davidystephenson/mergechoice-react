import yeast from 'yeast'
import populate from './populate'
import { Item, State, HistoryEvent, CreateOperation, CreateChoice } from './merge-choice-types'
import getShuffled from './getShuffled'
import asyncCreateYeastOperation from './asyncCreateYeastOperation'
import asyncCreateYeastChoice from './asyncCreateYeastChoice'

export default async function importItems <ListItem extends Item> (props: {
  createChoice?: CreateChoice
  createOperation?: CreateOperation
  items: ListItem[]
  slice?: number
  state: State<ListItem>
}): Promise<State<ListItem>> {
  const createChoice = props.createChoice ?? asyncCreateYeastChoice
  const createOperation = props.createOperation ?? asyncCreateYeastOperation
  const shuffled = getShuffled(props.items)
  const items = props.slice == null
    ? shuffled
    : shuffled.slice(0, props.slice)
  const { history, ...previousState } = props.state
  void history
  const population = await populate({
    createChoice,
    createOperation,
    items,
    state: props.state
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
