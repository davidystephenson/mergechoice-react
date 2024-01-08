import { CreateOperation, Id, Item, State } from './merge-choice-types'
import getItem from './getItem'
import removeItem from './removeItem'
import populate from './populate'
import asyncCreateYeastOperation from './asyncCreateYeastOperation'

export default async function resetItem <ListItem extends Item> (props: {
  createOperation?: CreateOperation
  id: Id
  state: State<ListItem>
}): Promise<State<ListItem>> {
  const createOperation = props.createOperation ?? asyncCreateYeastOperation
  const item = getItem({ id: props.id, items: props.state.items })
  const removedState = await removeItem({ id: props.id, state: props.state })
  const population = await populate({
    createOperation,
    items: [item],
    state: removedState
  })
  return population.state
}
