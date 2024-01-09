import createYeastChoice from './createYeastChoice'
import { Item, State } from './merge-choice-types'

export default function createYeastState <ListItem extends Item> (): State<ListItem> {
  return {
    activeIds: [],
    activeOperations: {},
    choice: createYeastChoice({
      options: [],
      aIndex: 0,
      bIndex: 1,
      random: false
    }),
    history: [],
    complete: false,
    betterIds: [],
    worseIds: [],
    betterOperations: {},
    reserveIds: [],
    items: {},
    worseOperations: {}
  }
}
