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
export interface HistoryArchiveData<ListItem extends Item> extends HistoryItemData<ListItem> { }
export interface HistoryRemoveData<ListItem extends Item> extends HistoryItemData<ListItem> { }
export interface HistoryResetData<ListItem extends Item> extends HistoryItemData<ListItem> { }
export interface HistoryUnarchiveData<ListItem extends Item> extends HistoryItemData<ListItem> { }
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
export interface HistoryDataMapped<ListItem extends Item> {
  archive: HistoryArchiveData<ListItem>
  choice: HistoryChoiceData<ListItem>
  import: HistoryImportData<ListItem>
  random: HistoryRandomData<ListItem>
  remove: HistoryRemoveData<ListItem>
  reset: HistoryResetData<ListItem>
  unarchive: HistoryUnarchiveData<ListItem>
}
export type HistoryDataKey<ListItem extends Item> = keyof HistoryDataMapped<ListItem>
export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]
export type HistoryData <ListItem extends Item> = HistoryDataMapped<ListItem>[HistoryDataKey<ListItem>]
export type HistoryDataMap<ListItem extends Item> = AtLeastOne<HistoryDataMapped<ListItem>>
export interface HistoryEvent<ListItem extends Item> extends Identity, Partial<HistoryDataMapped<ListItem>> {
  createdAt: number
}

export type HistoryDataMapping<ListItem extends Item, Mapped> = {
  [Key in HistoryDataKey<ListItem>]: Mapped
}

export type Restorer<ListItem extends Item> = (props: {
  event: HistoryEvent<ListItem>
  state: State<ListItem>
}) => State<ListItem>
export type Restorers<ListItem extends Item> = HistoryDataMapping<ListItem, Restorer<ListItem>>

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
