import getPoints from './getPoints'
import setupChoice from './setupChoice'
import applyRandomChoice from './applyRandomChoice'
import { CreateChoice, CreateOperation, Item, State } from './merge-choice-types'
import getItem from './getItem'
import getOperation from './getOperation'

export default async function applyChoice <ListItem extends Item> (props: {
  aBetter: boolean
  aItem: ListItem
  betterIndex: number
  bItem: ListItem
  createChoice: CreateChoice
  createOperation: CreateOperation
  state: State<ListItem>
}): Promise<State<ListItem>> {
  if (props.state.choice == null) {
    throw new Error('There is no choice.')
  }
  const aPoints = getPoints({ itemId: props.aItem.id, state: props.state })
  const bPoints = getPoints({ itemId: props.bItem.id, state: props.state })
  if (props.state.choice.random) {
    return await applyRandomChoice({
      aBetter: props.aBetter,
      aItem: props.aItem,
      aPoints,
      bItem: props.bItem,
      bPoints,
      createChoice: props.createChoice,
      createOperation: props.createOperation,
      state: props.state
    })
  }
  if (props.state.choice.operationMergeChoiceId == null) {
    throw new Error('There is no currentOperationId')
  }
  const currentOperation = getOperation({
    operations: props.state.activeOperations,
    id: props.state.choice.operationMergeChoiceId
  })
  const betterInput = currentOperation.input[props.betterIndex]
  const worseIndex = 1 - props.betterIndex
  const worseInput = currentOperation.input[worseIndex]
  const worseId = worseInput.shift()
  if (worseId == null) {
    throw new Error('There is no worseId')
  }
  const worseItem = getItem({ id: worseId, items: props.state.items })
  worseItem.updatedAt = Date.now()
  currentOperation.output.push(worseId)
  if (worseInput.length === 0) {
    currentOperation.output.push(...betterInput)
    currentOperation.input[props.betterIndex] = []
  }
  return await setupChoice({
    createChoice: props.createChoice,
    createOperation: props.createOperation,
    state: props.state
  })
}
