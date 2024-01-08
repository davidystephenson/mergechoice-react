export type Id = string | number
export interface Item {
  id: Id
  name: string
  updatedAt: number
}
export type Calculated<T> = T & { points: number }
export interface Operation {
  id: Id
  input: Id[][]
  output: Id[]
}
export interface ChoiceData {
  options: Id[]
  currentOperationId?: Id
  aIndex: number
  bIndex: number
  random: boolean
}
export interface Choice extends ChoiceData {
  id: Id
}
export interface State <ListItem extends Item> {
  items: Record<Id, ListItem>
  activeIds: Id[]
  betterIds: Id[]
  worseIds: Id[]
  reserveIds: Id[]
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
  id: Id
  choice?: {
    aBetter: boolean
    aId: Id
    aItem: Calculated<ListItem>
    bId: Id
    bItem: Calculated<ListItem>
    random: boolean
  }
  remove?: {
    id: Id
    item: Calculated<ListItem>
  }
  import?: {
    items: Array<Calculated<ListItem>>
  }
  previousState?: PreviousState<ListItem>
}
export interface RemovalFromOperations {
  emptiedOperationId?: Id
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
export type CreateOperation = (props?: {
  input?: [Id[], Id[]]
  output?: Id[]
}) => Promise<Operation>
export type CreateChoice = (props: ChoiceData) => Promise<Choice>
