export type ItemId = string | number
export interface Identity {
  mergeChoiceId: string
}
export interface Item {
  id: ItemId
  name: string
}
export type Calculated<T> = T & { points: number }
export interface Operation extends Identity {
  input: ItemId[][]
  output: ItemId[]
}
export interface ChoiceData {
  options: ItemId[]
  operationMergeChoiceId?: string | null
  aIndex: number
  bIndex: number
  random: boolean
}
export type Choice = ChoiceData & Identity
export type OperationDictionary = Record<string, Operation>
export interface State <ListItem extends Item> {
  activeIds: ItemId[]
  activeOperations: OperationDictionary
  betterIds: ItemId[]
  betterOperations: OperationDictionary
  choice?: Choice
  complete: boolean
  history: Array<HistoryEvent<ListItem>>
  items: Record<ItemId, ListItem>
  reserveIds: ItemId[]
  worseIds: ItemId[]
  worseOperations: OperationDictionary
}

export type PreviousState <ListItem extends Item> = Omit<State<ListItem>, 'history'> & {
  history?: Array<HistoryEvent<ListItem>>
}
export interface HistoryEvent <ListItem extends Item> extends Identity {
  createdAt: number
  choice?: {
    aBetter: boolean
    aId: ItemId
    aItem: Calculated<ListItem>
    bId: ItemId
    bItem: Calculated<ListItem>
    random: boolean
  }
  remove?: {
    id: ItemId
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
export interface Population <ListItem extends Item> {
  state: State<ListItem>
  items: ListItem[]
}
