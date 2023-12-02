import { Item, State } from './types'
import getItem from './getItem'
import removeItem from './removeItem'
import populate from './populate'

export default function resetItem <ListItem extends Item> ({
  id,
  state
}: {
  id: string
  state: State<ListItem>
}): State<ListItem> {
  const item = getItem({ id, items: state.items })
  const removedState = removeItem({ id, state })
  const populatedState = populate({ items: [item], state: removedState })
  return populatedState.state
}
