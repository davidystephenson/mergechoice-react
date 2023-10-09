import { STATE } from "../constants"
import { State, Movie } from "../types"
import clone from "./clone"
import createChoice from "./createChoice"
import getOperations from "./getOperations"
import getShuffled from "./getShuffled"

export default function initializeState({ items }: {
  items: Movie[]
}): State {
  const initialState = clone(STATE)
  initialState.items = getShuffled(items)
  initialState.operations = initialState.items.map(item => ({
    input: [[], []],
    output: [item.id],
    steps: 0
  }))
  initialState.operations = getOperations(initialState)
  initialState.choice = createChoice(initialState)
  return initialState
}