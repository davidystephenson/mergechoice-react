import createActiveChoice from './createActiveChoice'
import getPoints from './getPoints'
import removeFromOperations from './removeFromOperations'
import setupChoice from './setupChoice'
import { Item, State, HistoryEvent, Calculated, ItemId } from './mergeChoiceTypes'
import getItem from './getItem'

export default function removeItem <ListItem extends Item> (props: {
  itemId: ItemId
  state: State<ListItem>
}): State<ListItem> {
  const item = getItem({ itemId: props.itemId, items: props.state.items })
  const statePoints = getPoints({ itemId: props.itemId, state: props.state })
  const historyItem: Calculated<ListItem> = { ...item, points: statePoints }
  const oldState = JSON.parse(JSON.stringify(props.state))
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
  const { history, ...previousState } = oldState
  void history
  const removeEvent: HistoryEvent<ListItem> = {
    createdAt: Date.now(),
    remove: {
      itemId: props.itemId,
      item: historyItem
    },
    mergeChoiceId: props.state.history.length,
    previousState
  }
  props.state.history.unshift(removeEvent)

  const emptiedCurrentOperation = activeRemoval.emptiedOperationId === props.state.choice?.operationMergeChoiceId
  if (emptiedCurrentOperation) {
    const choiceSetup = setupChoice({
      state: props.state
    })
    return choiceSetup.state
  } else if (props.state.choice?.options.includes(props.itemId) === true) {
    props.state.choice = createActiveChoice({
      state: props.state
    })
  }
  return props.state
}
