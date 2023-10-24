import { Operation } from '../types'
import range from './range'

export default function getOperations ({ activeOperations }: {
  activeOperations: Operation[]
}): Operation[] {
  const blocks = activeOperations.map(operation => operation.output)
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
    newOperations.unshift({
      input: [blockA, blockB],
      output: []
    })
  })
  if (blocks.length === 1) {
    const output = blocks.pop()
    if (output == null) {
      throw new Error('output is null')
    }
    newOperations.push({
      input: [[], []],
      output
    })
  }
  return newOperations
}
