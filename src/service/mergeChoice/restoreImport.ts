import importItems from './importItems'
import { HistoryImportData, Item, State } from './mergeChoiceTypes'

export default function restoreImport<ListItem extends Item> (props: {
  data: HistoryImportData<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  const importedState = importItems({
    items: props.data.items,
    state: props.state
  })
  return importedState
}
