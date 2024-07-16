import archiveItem from './archiveItem'
import { HistoryArchiveData, Item, State } from './mergeChoiceTypes'

export default function restoreArchive <ListItem extends Item> (props: {
  input: HistoryArchiveData<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  const resetState = archiveItem({
    itemId: props.input.item.id,
    state: props.state
  })
  return resetState
}
