import { Operation } from "../types"
import getRandom from "./getRandom"
import range from "./range"

export default function getOperationIndex({
  operations
}: {
  operations: Operation[]
}): number {
  const maxSteps = Math.max(...operations.map(operation => operation.steps))
  const indices = range(operations.length)
  const maximalIndices = indices.filter(index => operations[index].steps === maxSteps)
  return getRandom(maximalIndices)
}