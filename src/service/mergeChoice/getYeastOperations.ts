import { Operation, OperationDictionary } from './merge-choice-types'
import range from './range'
import createYeastOperation from './createYeastOperation'
import arrayToDictionary from './arrayToDictionary'

export default function getYeastOperations ({ activeOperations }: {
  activeOperations: OperationDictionary
}): OperationDictionary {
  const values = Object.values(activeOperations)
  const blocks = values.map(operation => operation.output)
  blocks.sort((a, b) => b.length - a.length)
  const newOperations: Operation[] = []
  const pairsCount = Math.floor(blocks.length / 2)
  range(pairsCount).forEach(() => {
    const blockA = blocks.pop()
    if (blockA == null) {
      throw new Error('blockA is null')
    }
    const blockB = blocks.pop()
    if (blockB == null) {
      throw new Error('blockB is null')
    }
    const newOperation = createYeastOperation({
      input: [blockA, blockB]
    })
    newOperations.unshift(newOperation)
  })
  if (blocks.length === 1) {
    const output = blocks.pop()
    if (output == null) {
      throw new Error('output is null')
    }
    const newOperation = createYeastOperation({ output })
    newOperations.push(newOperation)
  }
  const dictionary = arrayToDictionary({ array: newOperations })
  return dictionary
}
