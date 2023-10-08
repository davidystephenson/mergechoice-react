import { Operation, Choice } from "../types"
import getOperationIndex from "./getOperationIndex"
import getRandom from "./getRandom"

export default function createChoice({ operations }: {
  operations: Operation[]
}): Choice {
  const newChoice: Choice = {
    options: [],
    currentOperationIndex: 0,
    leftIndex: 0,
    rightIndex: 1
  }
  newChoice.currentOperationIndex = getOperationIndex({ operations })
  const currentOperation = operations[newChoice.currentOperationIndex]
  newChoice.options[0] = currentOperation.input[0][0]
  newChoice.options[1] = currentOperation.input[1][0]
  newChoice.leftIndex = getRandom([0, 1])
  newChoice.rightIndex = 1 - newChoice.leftIndex
  return newChoice
}