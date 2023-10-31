import getOperations from './getOperations'
import getTotalSteps from './getTotalSteps'
import { Item, State, CountRange } from './types'

export default function getChoiceCount <ListItem extends Item> ({ state }: { state: State<ListItem> }): CountRange {
  const activeTotal = getTotalSteps({
    operations: state.activeOperations
  })
  const betterTotal = getTotalSteps({
    operations: state.betterOperations
  })
  const worseTotal = getTotalSteps({
    operations: state.worseOperations
  })
  const reserveOperations = state.reserveIds.map(id => {
    return {
      input: [[], []],
      output: [id]
    }
  })
  const newReserveOperations = getOperations({
    activeOperations: reserveOperations
  })
  const activePostOperation = {
    input: [[], []],
    output: state.activeIds
  }
  const betterPostOperation = {
    input: [[], []],
    output: state.betterIds
  }
  const worsePostOperation = {
    input: [[], []],
    output: state.worseIds
  }
  const reserveTotal = getTotalSteps({
    operations: [
      ...newReserveOperations,
      activePostOperation,
      betterPostOperation,
      worsePostOperation
    ]
  })
  const maximum = activeTotal.maximum + betterTotal.maximum + worseTotal.maximum + reserveTotal.maximum
  const minimum = activeTotal.minimum + betterTotal.minimum + worseTotal.minimum + reserveTotal.minimum
  return {
    maximum,
    minimum
  }
}
