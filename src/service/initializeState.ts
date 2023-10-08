import { STATE } from "../constants"
import { State, Item } from "../types"
import clone from "./clone"
import createChoice from "./createChoice"
import getOperations from "./getOperations"

export default function initializeState({ items }: {
  items: Item[]
}): State {
  const initialState = clone(STATE)
  initialState.items = items.slice(0, 6) 
  initialState.operations = initialState.items.map(item => ({
    input: [[], []],
    output: [item.id],
    steps: 0
  }))
  initialState.operations = getOperations(initialState)
  initialState.choice = createChoice(initialState)
  return initialState
}