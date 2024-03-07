import getShuffled from './getShuffled'

export default function shuffleSlice <Item> (props: {
  always?: boolean
  items: Item[]
  slice?: number
}): Item[] {
  if (props.always === true || props.slice != null) {
    const shuffled = getShuffled(props.items)
    const items = props.slice == null
      ? shuffled
      : shuffled.slice(0, props.slice)
    return items
  }
  return props.items
}
