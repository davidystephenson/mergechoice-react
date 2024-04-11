// import getOperation from './getOperation'
import cloneOperation from './cloneOperation'
import createOperation from './createOperation'
import debugOperations from './debugOperations'
import getItem from './getItem'
import getOperation from './getOperation'
import { State, Item, HistoryChoice, OperationDictionary } from './mergeChoiceTypes'

export default function undoChoice<ListItem extends Item> (props: {
  state: State<ListItem>
  historyChoice: HistoryChoice<ListItem>
}): State<ListItem> {
  console.log('props.state', props.state)
  console.log('props.choice', props.historyChoice)
  const newFirstOutputItem = getItem({
    itemId: props.historyChoice.newFirstOutput,
    items: props.state.items
  })
  console.log('newFirstOutputItem.name', newFirstOutputItem.name)
  const betterIndex = 1 - props.historyChoice.worseIndex
  console.log('betterIndex', betterIndex)
  const activeOperations = Object.values(props.state.activeOperations)
  const operationsAreFresh = activeOperations.every(operation =>
    operation.output.length === 0 || Math.max(operation.input[0].length, operation.input[1].length) === 0
  )
  console.log('operationsAreFresh', operationsAreFresh)
  if (operationsAreFresh) {
    const itemIdArrays = activeOperations.flatMap(operation => {
      const result = []
      if (operation.input[0].length > 0) result.push(operation.input[0])
      if (operation.input[1].length > 0) result.push(operation.input[1])
      if (operation.output.length > 0) result.push(operation.output)
      return result
    })
    const oldOperations = itemIdArrays.map(itemIdArray => createOperation({
      input: [[], []],
      output: itemIdArray,
      state: props.state
    }))
    const oldActiveOperations: OperationDictionary = {}
    oldOperations.forEach(operation => {
      oldActiveOperations[operation.mergeChoiceId] = operation
    })
    debugOperations({
      label: 'oldActiveOperations',
      operations: oldActiveOperations,
      items: props.state.items
    })
  } else {
    const oldOperation = getOperation({
      operations: props.state.activeOperations,
      itemId: props.historyChoice.operationId
    })
    const oldClone = cloneOperation({ operation: oldOperation })
    debugOperations({
      label: 'old operation',
      operations: {
        [oldClone.mergeChoiceId]: oldClone
      },
      items: props.state.items
    })
    const lastOutput = oldOperation.output.pop()
    if (lastOutput == null) {
      throw new Error('There is no lastOutput')
    }
    const operationWasFinished = Math.max(oldOperation.input[0].length, oldOperation.input[1].length) === 0
    console.log('operationWasFinished', operationWasFinished)
    const worseInput = oldOperation.input[props.historyChoice.worseIndex]
    worseInput.unshift(lastOutput)
    if (operationWasFinished) {
      const worseInput = oldOperation.input[props.historyChoice.worseIndex]
      console.log('worseInput', worseInput)
      const betterInput = oldOperation.input[betterIndex]
      const newLastOutput = oldOperation.output.pop()
      if (newLastOutput == null) {
        throw new Error('There is no newLastOutput')
      }
      betterInput.unshift(newLastOutput)
    }
    const afterClone = cloneOperation({ operation: oldOperation })
    debugOperations({
      label: 'operation after',
      operations: {
        [afterClone.mergeChoiceId]: afterClone
      },
      items: props.state.items
    })
  }
  console.log('newState', props.state)
  return props.state
}
