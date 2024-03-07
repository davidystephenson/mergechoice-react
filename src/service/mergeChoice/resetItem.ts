import { ItemId, Item, State } from './merge-choice-types'
import getItem from './getItem'
import removeItem from './removeItem'
import populate from './populate'

export default function resetItem <ListItem extends Item> (props: {
  id: ItemId
  state: State<ListItem>
}): State<ListItem> {
  const item = getItem({ id: props.id, items: props.state.items })
  const removedState = removeItem({ id: props.id, state: props.state })
  const population = populate({
    items: [item],
    state: removedState
  })
  return population.state
}
