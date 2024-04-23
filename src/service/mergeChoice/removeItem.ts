import createActiveChoice from './createActiveChoice'
import removeFromOperations from './removeFromOperations'
import setupChoice from './setupChoice'
import { Item, State, HistoryEvent, ItemId } from './mergeChoiceTypes'
import getCalculatedItem from './getCalculatedItem'

export default function removeItem<ListItem extends Item> (props: {
  itemId: ItemId
  silent?: boolean
  state: State<ListItem>
}): State<ListItem> {
  const { [props.itemId]: removedItem, ...newItems } = props.state.items
  void removedItem
  props.state.items = newItems
  props.state.activeIds = props.state.activeIds.filter(activeId => activeId !== props.itemId)
  props.state.reserveIds = props.state.reserveIds.filter(reserveId => reserveId !== props.itemId)
  props.state.betterIds = props.state.betterIds.filter(betterId => betterId !== props.itemId)
  props.state.worseIds = props.state.worseIds.filter(worseId => worseId !== props.itemId)
  const activeRemoval = removeFromOperations({
    itemId: props.itemId,
    operations: props.state.activeOperations
  })
  props.state.activeOperations = activeRemoval.operations
  props.state.betterOperations = removeFromOperations({ itemId: props.itemId, operations: props.state.betterOperations }).operations
  props.state.worseOperations = removeFromOperations({ itemId: props.itemId, operations: props.state.worseOperations }).operations
  if (props.silent !== true) {
    const item = getCalculatedItem({
      itemId: props.itemId,
      state: props.state
    })
    const removeEvent: HistoryEvent<ListItem> = {
      createdAt: Date.now(),
      remove: {
        item
      },
      mergeChoiceId: props.state.history.length
    }
    props.state.history.unshift(removeEvent)
  }

  const emptiedCurrentOperation = activeRemoval.emptiedOperationId === props.state.choice?.operationMergeChoiceId
  if (emptiedCurrentOperation) {
    const setupState = setupChoice({
      state: props.state
    })
    return setupState
  } else if (props.state.choice?.options.includes(props.itemId) === true) {
    props.state.choice = createActiveChoice({
      state: props.state
    })
  }
  return props.state
}
