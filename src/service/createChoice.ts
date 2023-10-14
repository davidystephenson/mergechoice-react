import { Operation, Choice } from '../types'
import getOperationIndex from './getOperationIndex'
import getRandom from './getRandom'

export default function createChoice ({ operations }: {
  operations: Operation[]
}): Choice {
  const newChoice: Choice = {
    options: [],
    currentOperationIndex: 0,
    aIndex: 0,
    bIndex: 1
  }
  newChoice.currentOperationIndex = getOperationIndex({ operations })
  const currentOperation = operations[newChoice.currentOperationIndex]
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
