export interface Item {
  id: string
  name: string
  updatedAt: number
}
export type Calculated<T> = T & { points: number }
export interface Operation {
  input: string[][]
  output: string[]
}
export interface Choice {
  options: string[]
  currentOperationIndex: number
  aIndex: number
  bIndex: number
  random: boolean
}
export interface HistoryEvent <ListItem extends Item> {
  createdAt: number
  id: string
  choice?: {
    aBetter: boolean
    aId: string
    aItem: Calculated<ListItem>
    bId: string
    bItem: Calculated<ListItem>
    random: boolean
  }
  remove?: {
    id: string
    item: Calculated<ListItem>
  }
  import?: {
    items: ListItem[]
  }
  previousState?: State<ListItem>
}
export interface State <ListItem extends Item> {
  activeItems: ListItem[]
  betterItems: ListItem[]
  worseItems: ListItem[]
  reserveItems: ListItem[]
  activeOperations: Operation[]
  betterOperations: Operation[]
  worseOperations: Operation[]
  choice?: Choice
  history: Array<HistoryEvent<ListItem>>
  finalized: boolean
}
export interface RemovalFromOperations {
  emptiedOperationIndex: number
  operations: Operation[]
}
export interface CountRange {
  maximum: number
  minimum: number
}
