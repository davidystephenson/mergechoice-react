import createChoice from './createChoice'
import getChoiceOperation from './getChoiceOperation'
import getOperation from './getOperation'
import getRandom from './getRandom'
import { Choice, ChoiceData, Item, State } from './merge-choice-types'

export default function createActiveChoice <ListItem extends Item> (props: {
  state: State<ListItem>
}): Choice {
  const choiceOperation = getChoiceOperation({ operations: props.state.activeOperations })
  console.log('choiceOperation', choiceOperation)
  const currentOperation = getOperation({
    operations: props.state.activeOperations,
    id: choiceOperation.mergeChoiceId
  })
  const firstOption = currentOperation.input[0][0]
  if (firstOption == null) {
    throw new Error('There is no first option.')
  }
  const secondOption = currentOperation.input[1][0]
  if (secondOption == null) {
    throw new Error('There is no second option.')
  }
  const aIndex = getRandom([0, 1])
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
