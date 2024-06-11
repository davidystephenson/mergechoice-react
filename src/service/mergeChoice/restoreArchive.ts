import archiveItem from './archiveItem'
import { HistoryEvent, Item, State } from './mergeChoiceTypes'

export default function restoreArchive <ListItem extends Item> (props: {
  event: HistoryEvent<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  if (props.event.archive == null) {
    throw new Error('There is no archive')
  }
  const resetState = archiveItem({
    itemId: props.event.archive.item.id,
    state: props.state
  })
  return resetState
}
