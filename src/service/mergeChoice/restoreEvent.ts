import { HistoryEvent, State, Item, Restorers, HistoryDataKey } from './mergeChoiceTypes'
import restoreArchive from './restoreArchive'
import restoreChoice from './restoreChoice'
import restoreImport from './restoreImport'
import restoreRandom from './restoreRandom'
import restoreRemove from './restoreRemove'
import restoreReset from './restoreReset'
import restoreUnarchive from './restoreUnarchive'

export default function restoreEvent<ListItem extends Item> (props: {
  event: HistoryEvent<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  const restorers: Restorers<ListItem> = {
    archive: restoreArchive,
    choice: restoreChoice,
    import: restoreImport,
    random: restoreRandom,
    remove: restoreRemove,
    reset: restoreReset,
    unarchive: restoreUnarchive
  }
  let key: HistoryDataKey<ListItem>
  for (key in restorers) {
    const data = props.event[key]
    if (data != null) {
      const restorer = restorers[key]
      const restored = restorer({
        event: props.event,
        state: props.state
      })
      return restored
    }
  }

  throw new Error('Unknown event type')
}
