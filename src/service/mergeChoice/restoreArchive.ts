import archiveItem from './archiveItem'
import { HistoryArchiveData, Item, State } from './mergeChoiceTypes'

export default function restoreArchive <ListItem extends Item> (props: {
  data: HistoryArchiveData<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  const resetState = archiveItem({
    itemId: props.data.item.id,
    state: props.state
  })
  return resetState
}
