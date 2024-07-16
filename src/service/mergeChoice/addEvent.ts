import { Episode, Item, Part, State } from './mergeChoiceTypes'

export default function addEpisode<ListItem extends Item> (props: {
  data: Part<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  const newEpisode: Episode<ListItem> = {
    ...props.data,
    createdAt: Date.now(),
    mergeChoiceId: props.state.history.length
  }
  props.state.history.unshift(newEpisode)
  return props.state
}
