import cloneOperation from './cloneOperation'
import debugOperations from './debugOperations'
import getOperation from './getOperation'
import { State, Item, HistoryChoice } from './mergeChoiceTypes'

export default function undoChoice<ListItem extends Item> (props: {
  state: State<ListItem>
  choice: HistoryChoice<ListItem>
}): State<ListItem> {
  console.log('props.state', props.state)
  console.log('props.choice', props.choice)
  const operation = getOperation({
    operations: props.state.activeOperations,
    itemId: props.choice.operationId
  })
  const beforeClone = cloneOperation({ operation })
  debugOperations({
    label: 'operation before',
    operations: {
      [beforeClone.mergeChoiceId]: beforeClone
    },
    items: props.state.items
  })
  const lastOutput = operation.output.pop()
  if (lastOutput == null) {
    throw new Error('There is no lastOutput')
  }
  const operationWasFinished = Math.max(operation.input[0].length, operation.input[1].length) === 0
  console.log('operationWasFinished', operationWasFinished)
  const worseInput = operation.input[props.choice.worseIndex]
  worseInput.unshift(lastOutput)
  if (operationWasFinished) {
    const betterIndex = 1 - props.choice.worseIndex
    const betterInput = operation.input[betterIndex]
    const newLastOutput = operation.output.pop()
    if (newLastOutput == null) {
      throw new Error('There is no newLastOutput')
    }
    betterInput.unshift(newLastOutput)
  }
  const afterClone = cloneOperation({ operation })
  debugOperations({
    label: 'operation after',
    operations: {
      [afterClone.mergeChoiceId]: afterClone
    },
    items: props.state.items
  })
  return props.state
}
