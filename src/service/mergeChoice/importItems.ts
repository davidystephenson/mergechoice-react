import populate from './populate'
import { Item, State } from './mergeChoiceTypes'
import setupChoice from './setupChoice'
import seedChoice from './seedChoice'
import addEvent from './addEvent'

export default function importItems <ListItem extends Item> (props: {
  items: ListItem[]
  silent?: boolean
  state: State<ListItem>
}): State<ListItem> {
  if (props.state.choice?.random === true) {
    throw new Error('You cannot import during a random choice')
  }
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
  if (props.silent !== true) {
    const data = {
      import: {
        items: calculated
      }
    }
    addEvent({
      data,
      state: setupState
    })
  }
  return seedChoice({ state: setupState })
}
