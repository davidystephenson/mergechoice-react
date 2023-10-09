import { State } from './types'

export const STATE: State = {
  items: [],
  operations: [],
  choice: {
    options: [],
    currentOperationIndex: 0,
    leftIndex: 0,
    rightIndex: 1
  },
  finalized: false
}
