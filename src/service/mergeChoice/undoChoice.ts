import createActiveChoice from './createActiveChoice'
import createOperation from './createOperation'
import debugItem from './debugItem'
import debugOperation from './debugOperation'
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
  console.log('props.historyChoice.fresh', props.historyChoice.fresh)
  if (props.historyChoice.fresh) {
    // half undone operations
    const itemIdArrays = activeOperations.flatMap(operation => {
      const result = []
      if (operation.input[0].length > 0) result.push(operation.input[0])
      if (operation.input[1].length > 0) result.push(operation.input[1])
      if (operation.output.length > 0) result.push(operation.output)
      return result
    })
    const halfUndoneOperations = itemIdArrays.map(itemIdArray => createOperation({
      input: [[], []],
      output: itemIdArray,
      state: props.state
    }))
    const halfUndoneActiveOperations: OperationDictionary = {}
    halfUndoneOperations.forEach(operation => {
      halfUndoneActiveOperations[operation.mergeChoiceId] = operation
    })
    debugOperations({
      label: 'halfUndoneActiveOperations',
      operations: halfUndoneActiveOperations,
      items: props.state.items
    })
    debugItem({
      label: 'props.historyChoice.newFirstOutput',
      itemId: props.historyChoice.newFirstOutput,
      items: props.state.items
    })
    props.state.activeOperations = halfUndoneActiveOperations
  }
  const activeOperationsArray = Object.values(props.state.activeOperations)
  const previousOperation = activeOperationsArray.find(operation => operation.output[0] === props.historyChoice.newFirstOutput)
  if (previousOperation == null) {
    throw new Error('There is no previous operation')
  }
  debugOperation({
    label: 'previousOperation',
    operation: previousOperation,
    items: props.state.items
  })
  const oldOperation = getOperation({
    operations: props.state.activeOperations,
    operationId: previousOperation.mergeChoiceId
  })
  debugOperation({
    label: 'oldOperation before',
    operation: oldOperation,
    items: props.state.items
  })
  const operationWasFinished = Math.max(oldOperation.input[0].length, oldOperation.input[1].length) === 0
  console.log('operationWasFinished', operationWasFinished)
  const lastOutput = oldOperation.output.pop()
  if (lastOutput == null) {
    throw new Error('There is no lastOutput')
  }
  const worseInput = oldOperation.input[props.historyChoice.worseIndex]
  worseInput.unshift(lastOutput)
  if (operationWasFinished) {
    const betterInput = oldOperation.input[betterIndex]
    const newLastOutput = oldOperation.output.pop()
    if (newLastOutput == null) {
      throw new Error('There is no newLastOutput')
    }
    console.log('newLastOutput', newLastOutput)
    const worseInput = oldOperation.input[props.historyChoice.worseIndex]
    const worseInputBefore = [...worseInput]
    console.log('worseInputBefore', worseInputBefore)
    betterInput.unshift(newLastOutput)
    if (worseInput.length === 0) {
      const nextLastOutput = oldOperation.output.pop()
      if (nextLastOutput == null) {
        throw new Error('There is no nextLastOutput')
      }
      console.log('nextLastOutput', nextLastOutput)
      worseInput.unshift(nextLastOutput)
    }
  }
  debugOperation({
    label: 'oldOperation after',
    operation: oldOperation,
    items: props.state.items
  })
  console.log('newState', props.state)
  props.state.history.shift()
  const nextChoice = createActiveChoice({
    state: props.state
  })
  props.state.choice = nextChoice
  return props.state
}
