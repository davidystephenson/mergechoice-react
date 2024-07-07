import mapHistoryData from './mapHistoryData'
import { HistoryEvent, State, Item } from './mergeChoiceTypes'
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
  const restorers = {
    archive: restoreArchive,
    choice: restoreChoice,
    import: restoreImport,
    random: restoreRandom,
    remove: restoreRemove,
    reset: restoreReset,
    unarchive: restoreUnarchive
  }
  const mapped = mapHistoryData({
    mapping: {
      archive (archiveProps) {
        const restorer = restorers[archiveProps.key]
        return restorer({
          data: archiveProps.data,
          state: props.state
        })
      },
      choice (choiceProps) {
        const restorer = restorers[choiceProps.key]
        return restorer({
          data: choiceProps.data,
          state: props.state
        })
      },
      import (importProps) {
        return restoreImport({
          data: importProps.data,
          state: props.state
        })
      },
      random (randomProps) {
        return restoreRandom({
          data: randomProps.data,
          state: props.state
        })
      },
      remove (removeProps) {
        return restoreRemove({
          data: removeProps.data,
          state: props.state
        })
      },
      reset (resetProps) {
        return restoreReset({
          data: resetProps.data,
          state: props.state
        })
      },
      unarchive (unarchiveProps) {
        return restoreUnarchive({
          data: unarchiveProps.data,
          state: props.state
        })
      }
    },
    event: props.event
  })
  return mapped
}
