import getOperationsSteps from './getOperationsSteps'
import getRandom from './getRandom'
import getMaximumSteps from './getMaximumSteps'
import range from './range'
import { Operation } from './merge-choice-types'

export default function getChoiceOperation (props: {
  operations: Operation[]
}): {
    index: number
    operation: Operation
  } {
  const maxSteps = getOperationsSteps({ operations: props.operations })
  if (maxSteps === 0) {
    throw new Error('All operations are complete.')
  }
  const indices = range(props.operations.length)
  const maximalIndices = indices.filter(index => {
    const operation = props.operations[index]
    const steps = getMaximumSteps({ operation })
    return steps === maxSteps
  })
  const index = getRandom(maximalIndices)
  return {
    index,
    operation: props.operations[index]
  }
}
