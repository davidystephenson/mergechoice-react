import { Item, State } from './mergeChoiceTypes'
import getItem from './getItem'
import removeItem from './removeItem'
import populate from './populate'

export default function resetItem <ListItem extends Item> (props: {
  itemId: number
  state: State<ListItem>
}): State<ListItem> {
  const item = getItem({ itemId: props.itemId, items: props.state.items })
  const removedState = removeItem({ itemId: props.itemId, state: props.state })
  const population = populate({
    items: [item],
    state: removedState
  })
  return population.state
}
