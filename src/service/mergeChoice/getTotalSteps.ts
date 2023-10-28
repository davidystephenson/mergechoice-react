import { Movie, Operation, CountRange } from '../../types'
import debugOperations from './debugOperations'
import range from './range'

function sum (x: number[]): number {
  let total = 0
  x.forEach(i => { total += i })
  return total
}

function getStructure ({
  operations
}: {
  operations: Operation[]
}): number[][] {
  return operations.map(operation => {
    return [operation.input[0].length, operation.input[1].length, operation.output.length]
  })
}

function getNextStructure ({
  structure
}: {
  structure: number[][]
}): number[][] {
  const blocks = structure.map(operation => operation[0] + operation[1] + operation[2])
  blocks.sort((a, b) => b - a)
  const pairsCount = Math.floor(blocks.length / 2)
  if (pairsCount === 0) return [[0, 0, blocks[0]]]
  const newStructure: number[][] = []
  range(pairsCount).forEach(() => {
    const blockA = blocks.pop()
    const blockB = blocks.pop()
    if (blockA == null) {
      throw new Error('blockA is null')
    } if (blockB == null) {
      throw new Error('blockB is null')
    }
    newStructure.push([blockA, blockB, 0])
  })
  if (blocks.length === 1) {
    const output = blocks.pop()
    if (output == null) {
      throw new Error('output is null')
    }
    newStructure.push([0, 0, output])
  }
  return newStructure
}

function getStructureSteps ({
  structure
}: {
  structure: number[][]
}): CountRange {
  const blocksMax = structure.map(operation => Math.max(0, operation[0] + operation[1] - 1))
  const blocksMin = structure.map(operation => Math.min(operation[0], operation[1]))
  return {
    maximum: sum(blocksMax),
    minimum: sum(blocksMin)
  }
}

export default function getTotalSteps ({ items, operations }: {
  items: Movie[]
  operations: Operation[]
}): CountRange {
  debugOperations({ label: 'getTotalSteps operations', operations, items })
  let maximum = 0
  let minimum = 0
  let structure = getStructure({ operations })
  let structureSteps = getStructureSteps({ structure })
  while (structureSteps.maximum > 0) {
    structureSteps = getStructureSteps({ structure })
    maximum += structureSteps.maximum
    minimum += structureSteps.minimum
    structure = getNextStructure({ structure })
    structureSteps = getStructureSteps({ structure })
  }
  return {
    maximum,
    minimum
  }
}
