import getChoiceOperation from './getChoiceOperation'
import getRandom from './getRandom'
import { Operation, Choice } from './merge-choice-types'

export default function createChoice ({
  activeOperations
}: {
  activeOperations: Operation[]
}): Choice {
  const choiceOperation = getChoiceOperation({ operations: activeOperations })
  const newChoice: Choice = {
    options: [],
    currentOperationIndex: choiceOperation.index,
    currentOperationId: choiceOperation.operation.id,
    aIndex: 0,
    bIndex: 1,
    random: false
  }
  const currentOperation = activeOperations[newChoice.currentOperationIndex]
  const firstOption = currentOperation.input[0][0]
  if (firstOption == null) {
    throw new Error('There is no first option.')
  }
  const secondOption = currentOperation.input[1][0]
  if (secondOption == null) {
    throw new Error('There is no second option.')
  }
  newChoice.options[0] = firstOption
  newChoice.options[1] = secondOption
  newChoice.aIndex = getRandom([0, 1])
  newChoice.bIndex = 1 - newChoice.aIndex
  return newChoice
}
