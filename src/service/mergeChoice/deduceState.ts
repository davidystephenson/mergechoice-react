import createState from './createState'
import { Episode, Item, State } from './mergeChoiceTypes'
import restoreEpisodeState from './restoreEventState'

export default function deduceState<ListItem extends Item> (props: {
  history: Array<Episode<ListItem>>
  seed: string
}): State<ListItem> {
  const initial = createState<ListItem>({ seed: props.seed })
  const reversed = props.history.slice().reverse()
  const deduced = reversed.reduce<State<ListItem>>((state, episode) => {
    const restoredState = restoreEpisodeState({ episode, state })
    const lastEpisode = restoredState.history[0]
    lastEpisode.createdAt = episode.createdAt
    return restoredState
  }, initial)
  return deduced
}
