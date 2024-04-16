export type ItemId = number | string
export interface Identity {
  mergeChoiceId: number
}
export interface Item {
  id: ItemId
  name: string
  score: number
}
export type Calculated<T> = T & { points: number }
export interface Operation extends Identity {
  input: ItemId[][]
  output: ItemId[]
  priority: number
}
export interface ChoiceData {
  options: ItemId[]
  operationMergeChoiceId?: number | null
  aIndex: number
  bIndex: number
  random: boolean
}
export type Choice = ChoiceData & Identity
export type OperationDictionary = Record<number, Operation>
export interface State<ListItem extends Item> {
  activeIds: ItemId[]
  activeOperations: OperationDictionary
  betterIds: ItemId[]
  betterOperations: OperationDictionary
  choice?: Choice
  choiceCount: number
  complete: boolean
  history: Array<HistoryEvent<ListItem>>
  items: Record<ItemId, ListItem>
  operationCount: number
  reserveIds: ItemId[]
  seed: string
  worseIds: ItemId[]
  worseOperations: OperationDictionary
}

export type PreviousState<ListItem extends Item> = Omit<State<ListItem>, 'history'> & {
  history?: Array<HistoryEvent<ListItem>>
}
export interface HistoryChoice <ListItem extends Item> {
  aBetter: boolean
  aId: ItemId
  aItem: Calculated<ListItem>
  bId: ItemId
  bItem: Calculated<ListItem>
  fresh: boolean
  newFirstOutput: ItemId
  operationId: number
  random: boolean
  worseIndex: number
}
export interface HistoryEvent<ListItem extends Item> extends Identity {
  createdAt: number
  choice?: HistoryChoice<ListItem>
  remove?: {
    itemId: ItemId
    item: Calculated<ListItem>
  }
  import?: {
    items: Array<Calculated<ListItem>>
  }
  previousState?: PreviousState<ListItem>
}
export interface RemovalFromOperations {
  emptiedOperationId?: ItemId
  operations: OperationDictionary
}
export interface CountRange {
  maximum: number
  minimum: number
}
export interface Population<ListItem extends Item> {
  state: State<ListItem>
  items: ListItem[]
}
export interface Prioritized {
  priority: number
}
export interface ChoiceSetup<ListItem extends Item> {
  state: State<ListItem>
  fresh: boolean
}
