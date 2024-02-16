import yeast from 'yeast'
import createActiveChoice from './createActiveChoice'
import getPoints from './getPoints'
import removeFromOperations from './removeFromOperations'
import setupChoice from './setupChoice'
import { Item, State, HistoryEvent, Calculated, CreateOperation, ItemId, CreateChoice } from './merge-choice-types'
import getItem from './getItem'
import asyncCreateYeastOperation from './asyncCreateYeastOperation'
import asyncCreateYeastChoice from './asyncCreateYeastChoice'

export default async function removeItem <ListItem extends Item> (props: {
  createChoice?: CreateChoice
  createOperation?: CreateOperation
  id: ItemId
  state: State<ListItem>
}): Promise<State<ListItem>> {
  const createChoice = props.createChoice ?? asyncCreateYeastChoice
  const createOperation = props.createOperation ?? asyncCreateYeastOperation
  const item = getItem({ id: props.id, items: props.state.items })
  const statePoints = getPoints({ itemId: props.id, state: props.state })
  const historyItem: Calculated<ListItem> = { ...item, points: statePoints }
  const oldState = JSON.parse(JSON.stringify(props.state))
  const { [props.id]: removedItem, ...newItems } = props.state.items
  void removedItem
  props.state.items = newItems
  props.state.activeIds = props.state.activeIds.filter(activeId => activeId !== props.id)
  props.state.reserveIds = props.state.reserveIds.filter(reserveId => reserveId !== props.id)
  props.state.betterIds = props.state.betterIds.filter(betterId => betterId !== props.id)
  props.state.worseIds = props.state.worseIds.filter(worseId => worseId !== props.id)
  const activeRemoval = removeFromOperations({
    itemId: props.id,
    operations: props.state.activeOperations
  })
  props.state.activeOperations = activeRemoval.operations
  props.state.betterOperations = removeFromOperations({ itemId: props.id, operations: props.state.betterOperations }).operations
  props.state.worseOperations = removeFromOperations({ itemId: props.id, operations: props.state.worseOperations }).operations
  const { history, ...previousState } = oldState
  void history
  const removeEvent: HistoryEvent<ListItem> = {
    createdAt: Date.now(),
    remove: {
      id: props.id,
      item: historyItem
    },
    mergeChoiceId: yeast(),
    previousState
  }
  props.state.history.unshift(removeEvent)

  const emptiedCurrentOperation = activeRemoval.emptiedOperationId === props.state.choice?.operationMergeChoiceId
  if (emptiedCurrentOperation) {
    return await setupChoice({
      state: props.state,
      createChoice,
      createOperation
    })
  } else if (props.state.choice?.options.includes(props.id) === true) {
    props.state.choice = await createActiveChoice({
      activeOperations: props.state.activeOperations,
      createChoice
    })
  }
  return props.state
}
