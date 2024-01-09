export type Id = string | number
export interface Identity {
  id: Id
}
export interface Item extends Identity {
  name: string
  updatedAt: Date
}
export type Calculated<T> = T & { points: number }
export interface Operation extends Identity {
  input: Id[][]
  output: Id[]
}
export interface ChoiceData {
  options: Id[]
  operationId?: Id
  aIndex: number
  bIndex: number
  random: boolean
}
export type Choice = ChoiceData & Identity
export type OperationDictionary = Record<Id, Operation>
export interface State <ListItem extends Item> {
  activeIds: Id[]
  activeOperations: OperationDictionary
  betterIds: Id[]
  betterOperations: OperationDictionary
  choice?: Choice
  complete: boolean
  history: Array<HistoryEvent<ListItem>>
  items: Record<Id, ListItem>
  reserveIds: Id[]
  worseIds: Id[]
  worseOperations: OperationDictionary
}

export type PreviousState <ListItem extends Item> = Omit<State<ListItem>, 'history'> & {
  history?: Array<HistoryEvent<ListItem>>
}
export interface HistoryEvent <ListItem extends Item> extends Identity {
  createdAt: number
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
export type CreateOperation = (props?: {
  input?: [Id[], Id[]]
  output?: Id[]
}) => Promise<Operation>
export type CreateChoice = (props: ChoiceData) => Promise<Choice>
