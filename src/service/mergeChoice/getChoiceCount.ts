import arrayToDictionary from './arrayToDictionary'
import createYeastOperation from './createYeastOperation'
import getTotalSteps from './getTotalSteps'
import getYeastOperations from './getYeastOperations'
import { Item, State, CountRange } from './merge-choice-types'

export default function getChoiceCount <ListItem extends Item> (props: {
  state: State<ListItem>
}): CountRange {
  const activeTotal = getTotalSteps({
    operations: props.state.activeOperations
  })
  const betterTotal = getTotalSteps({
    operations: props.state.betterOperations
  })
  const worseTotal = getTotalSteps({
    operations: props.state.worseOperations
  })
  const reserveOperationArray = props.state.reserveIds.map(id => {
    return createYeastOperation({ output: [id] })
  })
  const reserveOperations = arrayToDictionary({ array: reserveOperationArray })
  const newReserveOperations = getYeastOperations({
    activeOperations: reserveOperations
  })
  const activePostOperation = createYeastOperation({
    output: props.state.activeIds
  })
  const betterPostOperation = createYeastOperation({
    output: props.state.betterIds
  })
  const worsePostOperation = createYeastOperation({
    output: props.state.worseIds
  })
  const operations = {
    ...newReserveOperations,
    [activePostOperation.mergeChoiceId]: activePostOperation,
    [betterPostOperation.mergeChoiceId]: betterPostOperation,
    [worsePostOperation.mergeChoiceId]: worsePostOperation
  }
  const reserveTotal = getTotalSteps({
    operations
  })
  const maximum = activeTotal.maximum + betterTotal.maximum + worseTotal.maximum + reserveTotal.maximum
  const minimum = activeTotal.minimum + betterTotal.minimum + worseTotal.minimum + reserveTotal.minimum
  return {
    maximum,
    minimum
  }
}
