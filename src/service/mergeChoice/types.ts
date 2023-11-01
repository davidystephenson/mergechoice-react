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
export interface State <ListItem extends Item> {
  items: Record<string, ListItem>
  activeIds: string[]
  betterIds: string[]
  worseIds: string[]
  reserveIds: string[]
  activeOperations: Operation[]
  betterOperations: Operation[]
  worseOperations: Operation[]
  choice?: Choice
  history: Array<HistoryEvent<ListItem>>
  finalized: boolean
}
export type PreviousState <ListItem extends Item> = Omit<State<ListItem>, 'history'> & {
  history?: Array<HistoryEvent<ListItem>>
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
    items: Array<Calculated<ListItem>>
  }
  previousState?: PreviousState<ListItem>
}
export interface RemovalFromOperations {
  emptiedOperationIndex: number
  operations: Operation[]
}
export interface CountRange {
  maximum: number
  minimum: number
}
export interface Population <ListItem extends Item> {
  state: State<ListItem>
  items: ListItem[]
}
