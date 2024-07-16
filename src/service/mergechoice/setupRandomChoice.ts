import createRandomChoice from './createRandomChoice'
import getCalculatedItem from './getCalculatedItem'
import getRandomElement from './getRandomElement'
import { Item, State } from './mergeChoiceTypes'

export default function setupRandomChoice <ListItem extends Item> (props: {
  state: State<ListItem>
}): State<ListItem> {
  const seed = `${props.state.seed}${props.state.choiceCount}`
  const firstSeed = `first${seed}`
  const firstId = getRandomElement({
    array: props.state.activeIds,
    seed: firstSeed
  })
  const firstItem = getCalculatedItem({
    itemId: firstId,
    state: props.state
  })
  const secondSeed = `second${seed}`
  const secondId = getRandomElement({
    array: props.state.activeIds,
    seed: secondSeed
  })
  const secondItem = getCalculatedItem({
    itemId: secondId,
    state: props.state
  })
  return createRandomChoice({
    state: props.state,
    firstItem,
    secondItem
  })
}
