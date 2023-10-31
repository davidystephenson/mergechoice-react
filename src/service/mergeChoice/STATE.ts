import { Item, State } from './types'

export default function STATE <ListItem extends Item> (): State<ListItem> {
  return {
    activeIds: [],
    activeOperations: [],
    choice: {
      options: [],
      currentOperationIndex: 0,
      aIndex: 0,
      bIndex: 1,
      random: false
    },
    history: [],
    finalized: false,
    betterIds: [],
    worseIds: [],
    betterOperations: [],
    reserveIds: [],
    items: {},
    worseOperations: []
  }
}
