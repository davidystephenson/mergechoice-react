import createChoice from './createChoice'
import { Item, State } from './merge-choice-types'

export default function createState <ListItem extends Item> (): State<ListItem> {
  return {
    activeIds: [],
    activeOperations: {},
    choice: createChoice({
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
