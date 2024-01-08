import range from './range'
import { CreateOperation, Operation } from './merge-choice-types'

export default async function getOperations (props: {
  activeOperations: Operation[]
  createOperation: CreateOperation
}): Promise<Operation[]> {
  const blocks = props.activeOperations.map(operation => operation.output)
  blocks.sort((a, b) => b.length - a.length)
  const newOperations: Operation[] = []
  const pairsCount = Math.floor(blocks.length / 2)
  const pairsRange = range(pairsCount)
  const pairsPromises = pairsRange.map(async () => {
    const blockA = blocks.pop()
    if (blockA == null) {
      throw new Error('blockA is null')
    }
    const blockB = blocks.pop()
    if (blockB == null) {
      throw new Error('blockB is null')
    }
    const newOperation = await props.createOperation({
      input: { first: blockA, second: blockB }
    })
    newOperations.unshift(newOperation)
  })
  await Promise.all(pairsPromises)
  if (blocks.length === 1) {
    const output = blocks.pop()
    if (output == null) {
      throw new Error('output is null')
    }
    const newOperation = await props.createOperation({ output })
    newOperations.push(newOperation)
  }
  return newOperations
}
