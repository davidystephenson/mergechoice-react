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
  const reserveOperations = state.reserveItems.map(item => {
    return {
      input: [[], []],
      output: [item.id]
    }
  })
  const newReserveOperations = getOperations({
    activeOperations: reserveOperations
  })
  const activePostOperation = {
    input: [[], []],
    output: state.activeItems.map(item => item.id)
  }
  const betterPostOperation = {
    input: [[], []],
    output: state.betterItems.map(item => item.id)
  }
  const worsePostOperation = {
    input: [[], []],
    output: state.worseItems.map(item => item.id)
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
