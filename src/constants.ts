import { State } from './types'

export const STATE: State = {
  items: [],
  operations: [],
  choice: {
    options: [],
    currentOperationIndex: 0,
    aIndex: 0,
    bIndex: 1
  },
  finalized: false
}
