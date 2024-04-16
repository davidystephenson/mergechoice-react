import labelItem from './labelItem'
import { HistoryChoice, Item, ItemId } from './mergeChoiceTypes'

export default function debugHistoryChoice <ListItem extends Item> (props: {
  historyChoice: HistoryChoice<ListItem>
  items: Record<ItemId, ListItem>
  label: string
}): void {
  const newFirstOutput = labelItem({
    itemId: props.historyChoice.newFirstOutput,
    items: props.items
  })
  const output = {
    aBetter: props.historyChoice.aBetter,
    a: props.historyChoice.aItem.name,
    b: props.historyChoice.bItem.name,
    fresh: props.historyChoice.fresh,
    newFirstOutput,
    operationId: props.historyChoice.operationId,
    random: props.historyChoice.random,
    worseIndex: props.historyChoice.worseIndex
  }
  console.debug(props.label, output)
}
