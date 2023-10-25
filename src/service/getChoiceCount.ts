import { CountRange, State } from '../types'
import getOperations from './getOperations'
import getTotalSteps from './getTotalSteps'

export default function getChoiceCount ({ state }: { state: State }): CountRange {
  const activeTotal = getTotalSteps({
    items: state.activeItems,
    operations: state.activeOperations
  })
  const betterTotal = getTotalSteps({
    items: state.betterItems,
    operations: state.betterOperations
  })
  const worseTotal = getTotalSteps({
    items: state.worseItems,
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
    items: [...state.activeItems, ...state.betterItems, ...state.reserveItems, ...state.worseItems],
    operations: [
      ...newReserveOperations,
      activePostOperation,
      betterPostOperation,
      worsePostOperation
    ]
  })
  const minimum = activeTotal.minimum + betterTotal.minimum + worseTotal.minimum + reserveTotal.minimum
  const maximum = activeTotal.maximum + betterTotal.maximum + worseTotal.maximum + reserveTotal.maximum
  return {
    maximum,
    minimum
  }
}
