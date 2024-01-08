import getChoiceOperation from './getChoiceOperation'
import getOperation from './getOperation'
import getRandom from './getRandom'
import { Operation, Choice, ChoiceData, CreateChoice } from './merge-choice-types'

export default async function createActiveChoice (props: {
  activeOperations: Operation[]
  createChoice: CreateChoice
}): Promise<Choice> {
  const choiceOperation = getChoiceOperation({ operations: props.activeOperations })
  const currentOperation = getOperation({
    operations: props.activeOperations,
    id: choiceOperation.operation.id
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
    currentOperationId: choiceOperation.operation.id,
    aIndex,
    bIndex,
    random: false
  }
  const newChoice = await props.createChoice(newChoiceData)
  return newChoice
}
