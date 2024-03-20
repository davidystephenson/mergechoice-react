import { Item, State } from './merge-choice-types'

export default function createState <ListItem extends Item> (): State<ListItem> {
  return {
    activeIds: [],
    activeOperations: {},
    betterIds: [],
    betterOperations: {},
    choice: {
      aIndex: 0,
      bIndex: 1,
      mergeChoiceId: 0,
      options: [],
      random: false
    },
    choiceCount: 0,
    complete: false,
    history: [],
    items: {},
    operationCount: 0,
    reserveIds: [],
    worseIds: [],
    worseOperations: {}
  }
}
