import arrayToDictionary from './arrayToDictionary'
import createOperation from './createOperation'
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
    return createOperation({ output: [id] })
  })
  const reserveOperations = arrayToDictionary({ array: reserveOperationArray })
  const newReserveOperations = getYeastOperations({
    activeOperations: reserveOperations
  })
  const activePostOperation = createOperation({
    output: props.state.activeIds
  })
  const betterPostOperation = createOperation({
    output: props.state.betterIds
  })
  const worsePostOperation = createOperation({
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
