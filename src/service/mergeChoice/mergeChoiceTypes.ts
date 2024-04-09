export interface Identity {
  mergeChoiceId: number
}
export interface ItemData {
  name: string
}
export type Identified <Data> = Data & Identity
export type Item = Identified<ItemData>
export type Calculated<T> = T & { points: number }
export interface Operation extends Identity {
  input: number[][]
  output: number[]
  priority: number
}
export interface ChoiceData {
  options: number[]
  operationMergeChoiceId?: number | null
  aIndex: number
  bIndex: number
  random: boolean
}
export type Choice = ChoiceData & Identity
export type OperationDictionary = Record<number, Operation>
export interface State<ListItem extends Item> {
  activeIds: number[]
  activeOperations: OperationDictionary
  betterIds: number[]
  betterOperations: OperationDictionary
  choice?: Choice
  choiceCount: number
  complete: boolean
  history: Array<HistoryEvent<ListItem>>
  itemCount: number
  items: Record<number, ListItem>
  operationCount: number
  reserveIds: number[]
  seed: string
  worseIds: number[]
  worseOperations: OperationDictionary
}

export type PreviousState<ListItem extends Item> = Omit<State<ListItem>, 'history'> & {
  history?: Array<HistoryEvent<ListItem>>
}
export interface HistoryEvent<ListItem extends Item> extends Identity {
  createdAt: number
  choice?: {
    aBetter: boolean
    aId: number
    aItem: Calculated<ListItem>
    bId: number
    bItem: Calculated<ListItem>
    random: boolean
  }
  remove?: {
    id: number
    item: Calculated<ListItem>
  }
  import?: {
    items: Array<Calculated<ListItem>>
  }
  previousState?: PreviousState<ListItem>
}
export interface RemovalFromOperations {
  emptiedOperationId?: number
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
