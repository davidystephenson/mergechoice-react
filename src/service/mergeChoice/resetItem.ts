import { CreateChoice, CreateOperation, ItemId, Item, State } from './merge-choice-types'
import getItem from './getItem'
import removeItem from './removeItem'
import populate from './populate'
import asyncCreateYeastOperation from './asyncCreateYeastOperation'
import asyncCreateYeastChoice from './asyncCreateYeastChoice'

export default async function resetItem <ListItem extends Item> (props: {
  createChoice?: CreateChoice
  createOperation?: CreateOperation
  id: ItemId
  state: State<ListItem>
}): Promise<State<ListItem>> {
  const createChoice = props.createChoice ?? asyncCreateYeastChoice
  const createOperation = props.createOperation ?? asyncCreateYeastOperation
  const item = getItem({ id: props.id, items: props.state.items })
  const removedState = await removeItem({ id: props.id, state: props.state })
  const population = await populate({
    createChoice,
    createOperation,
    items: [item],
    state: removedState
  })
  return population.state
}
