import getOperationsSteps from './getOperationsSteps'
import getRandom from './getRandom'
import getMaximumSteps from './getMaximumSteps'
import { Operation, OperationDictionary } from './merge-choice-types'

export default function getChoiceOperation (props: {
  operations: OperationDictionary
}): Operation {
  console.log('props.operations', props.operations)
  const maxSteps = getOperationsSteps({ operations: props.operations })
  const values = Object.values(props.operations)
  const maximalIndices = values.filter(operation => {
    const steps = getMaximumSteps({ operation })
    return steps === maxSteps
  })
  const operation = getRandom(maximalIndices)
  return operation
}
