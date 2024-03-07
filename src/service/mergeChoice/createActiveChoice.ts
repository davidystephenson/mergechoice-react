import createChoice from './createChoice'
import getChoiceOperation from './getChoiceOperation'
import getOperation from './getOperation'
import getRandom from './getRandom'
import { Choice, ChoiceData, OperationDictionary } from './merge-choice-types'

export default function createActiveChoice (props: {
  activeOperations: OperationDictionary
}): Choice {
  const choiceOperation = getChoiceOperation({ operations: props.activeOperations })
  const currentOperation = getOperation({
    operations: props.activeOperations,
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
  const newChoice = createChoice(newChoiceData)
  return newChoice
}
