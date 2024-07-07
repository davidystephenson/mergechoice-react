import { ListItem } from 'react-virtuoso'

export type ItemId = number | string
export interface Identity {
  mergeChoiceId: number
}
export interface Item {
  id: ItemId
  seeding: boolean
  name: string
  seed?: number
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
export type ItemDictionary<ListItem> = Record<ItemId, ListItem>
export interface State<ListItem extends Item> {
  activeIds: ItemId[]
  activeOperations: OperationDictionary
  archive: ItemDictionary<ListItem>
  betterIds: ItemId[]
  betterOperations: OperationDictionary
  choice?: Choice
  choiceCount: number
  complete: boolean
  history: Array<HistoryEvent<ListItem>>
  items: ItemDictionary<ListItem>
  operationCount: number
  reserveIds: ItemId[]
  seed: string
  worseIds: ItemId[]
  worseOperations: OperationDictionary
}

export interface HistoryItemData<ListItem extends Item> {
  item: Calculated<ListItem>
}
export interface HistoryArchiveData<ListItem extends Item> extends HistoryItemData<ListItem> {}
export interface HistoryRemoveData<ListItem extends Item> extends HistoryItemData<ListItem> {}
export interface HistoryResetData<ListItem extends Item> extends HistoryItemData<ListItem> {}
export interface HistoryUnarchiveData<ListItem extends Item> extends HistoryItemData<ListItem> {}
export interface HistoryChoiceData<ListItem extends Item> {
  aBetter: boolean
  aId: ItemId
  aItem: Calculated<ListItem>
  betterIndex: number
  bId: ItemId
  bItem: Calculated<ListItem>
  random: boolean
  seeded: boolean
}
export interface HistoryImportData<ListItem extends Item> {
  items: Array<Calculated<ListItem>>
}
export interface HistoryRandomData<ListItem extends Item> {
  first: Calculated<ListItem>
  second: Calculated<ListItem>
}
export interface HistoryMapped<ListItem extends Item> {
  archive: HistoryArchiveData<ListItem>
  choice: HistoryChoiceData<ListItem>
  import: HistoryImportData<ListItem>
  random: HistoryRandomData<ListItem>
  remove: HistoryRemoveData<ListItem>
  reset: HistoryResetData<ListItem>
  unarchive: HistoryUnarchiveData<ListItem>
}
export type HistoryDataKey<ListItem extends Item> = keyof HistoryMapped<ListItem>
export type HistoryDataDelivery<ListItem extends Item> = Partial<HistoryMapped<ListItem>>
export type HistoryDataHearsay<ListItem extends Item, Key extends HistoryDataKey<ListItem>> = NonNullable<HistoryDataDelivery<ListItem>[Key]>
export interface HistoryDataFeedback<ListItem extends Item, Key extends HistoryDataKey<ListItem>> {
  data: HistoryDataHearsay<ListItem, Key>
  state: State<ListItem>
}
export type HistoryDataActor <
  ListItem extends Item, Key extends HistoryDataKey<ListItem>
> = (props: HistoryDataFeedback<ListItem, Key>) => State<ListItem>
export type HistoryDataActors<ListItem extends Item> = {
  [Key in HistoryDataKey<ListItem>]: HistoryDataActor<ListItem, Key>
}
export interface HistoryDataStrategy <ListItem extends Item, Key extends HistoryDataKey<ListItem>> {
  actor: HistoryDataActor<ListItem, Key>
  hearsay: HistoryDataHearsay<ListItem, Key>
}
export type HistoryDataDirector <
  ListItem extends Item, Output
> = <Key extends HistoryDataKey<ListItem>> (props: HistoryDataStrategy<ListItem, Key>) => Output
export interface HistoryDataTeam <ListItem extends Item, Output> {
  actors: HistoryDataActors<ListItem>
  delivery: HistoryDataDelivery<ListItem>
  director: HistoryDataDirector<ListItem, Output>
}
export interface HistoryDataProblem <ListItem extends Item, Output, Key extends HistoryDataKey<ListItem>> {
  key: Key
  team: HistoryDataTeam<ListItem, Output>
}
export type HistoryDataStrategist = <
  ListItem extends Item, Output, Key extends HistoryDataKey<ListItem>
> (props: HistoryDataProblem<ListItem, Output, Key>) => HistoryDataStrategy<ListItem, Key>
export type HistoryDataMarion <ListItem extends Item, Output> = (
  props: HistoryDataTeam<ListItem, Output>
) => Output

export interface HistoryEvent<ListItem extends Item> extends Identity, HistoryDataDelivery<ListItem> {
  createdAt: number
}

export type HistoryDataMapper<
  ListItem extends Item, Key extends HistoryDataKey<ListItem>, Result
> = (props: {
  data: HistoryMap<ListItem>[Key]
  key: Key
}) => Result
export type HistoryDataMappers<ListItem extends Item, Result> = {
  [Key in HistoryDataKey<ListItem>]: HistoryDataMapper<ListItem, Key, Result>
}

export type Restorers<ListItem extends Item> = HistoryDataMappers<ListItem, State<ListItem>>

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
export type StoredState<ListItem extends Item> = Pick<State<ListItem>, 'seed' | 'history'>
