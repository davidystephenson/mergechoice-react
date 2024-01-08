import { Operation } from './merge-choice-types'
import range from './range'
import createYeastOperation from './createYeastOperation'

export default function getYeastOperations ({ activeOperations }: {
  activeOperations: Operation[]
}): Operation[] {
  const blocks = activeOperations.map(operation => operation.output)
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
      input: {
        first: blockA,
        second: blockB
      }
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
  return newOperations
}
