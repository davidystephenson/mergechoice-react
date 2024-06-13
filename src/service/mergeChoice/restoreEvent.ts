import mapHistoryData from './mapHistoryData'
import { HistoryEvent, State, Item, Restorers } from './mergeChoiceTypes'
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
  const mapped = mapHistoryData({
    data: restorers,
    event: props.event,
    map: ({ value }) => {
      const restored = value({
        event: props.event,
        state: props.state
      })
      return restored
    }
  })
  return mapped
}
