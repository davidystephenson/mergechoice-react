import deduceState from './deduceState'
import { ItemId, Item, State } from './mergeChoiceTypes'

export default function rewindState <ListItem extends Item> (props: {
  episodeId: ItemId
  state: State<ListItem>
}): State<ListItem> {
  const index = props.state.history.findIndex(
    episode => episode.mergeChoiceId === props.episodeId
  )
  if (index === -1) {
    throw new Error('There is no episode')
  }
  const episodes = props.state.history.slice(index + 1)
  const newState = deduceState({
    history: episodes,
    seed: props.state.seed
  })
  return newState
}
