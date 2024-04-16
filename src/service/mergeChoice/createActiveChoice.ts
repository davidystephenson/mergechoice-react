import createChoice from './createChoice'
import getChoiceOperation from './getChoiceOperation'
import getOperation from './getOperation'
import getRandomRange from './getRandomRange'
import { Choice, ChoiceData, Item, State } from './mergeChoiceTypes'

// TODO combine choice and current operation
export default function createActiveChoice <ListItem extends Item> (props: {
  state: State<ListItem>
}): Choice {
  const choiceOperation = getChoiceOperation({ operations: props.state.activeOperations })
  const currentOperation = getOperation({
    operations: props.state.activeOperations,
    operationId: choiceOperation.mergeChoiceId
  })
  const firstOption = currentOperation.input[0][0]
  if (firstOption == null) {
    throw new Error('There is no first option.')
  }
  const secondOption = currentOperation.input[1][0]
  if (secondOption == null) {
    throw new Error('There is no second option.')
  }
  const seed = `${props.state.seed}${props.state.choiceCount}`
  const aIndex = getRandomRange({ seed, maximum: 2 })
  const bIndex = 1 - aIndex
  const newChoiceData: ChoiceData = {
    options: [firstOption, secondOption],
    operationMergeChoiceId: choiceOperation.mergeChoiceId,
    aIndex,
    bIndex,
    random: false
  }
  const newChoice = createChoice({
    choice: newChoiceData,
    state: props.state
  })
  return newChoice
}
