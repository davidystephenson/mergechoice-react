export interface Item {
  id: string
  label: string
  points: number
}
export interface Operation {
  input: string[][]
  output: string[]
  steps: number
}
export interface Choice {
  options: string[]
  currentOperationIndex: number
  leftIndex: number
  rightIndex: number
}
export interface State {
  items: Item[]
  operations: Operation[]
  choice: Choice
  finalized: boolean
}
export interface ListContextValue {
  state: State
  applyChoice: ({ optionIndex }: { optionIndex: number }) => void
}
