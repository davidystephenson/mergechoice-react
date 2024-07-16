import { Part } from './marion/marionTypes'

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
  history: Array<Episode<ListItem>>
  items: ItemDictionary<ListItem>
  operationCount: number
  reserveIds: ItemId[]
  seed: string
  worseIds: ItemId[]
  worseOperations: OperationDictionary
}
export type HistoryDataPart<ListItem extends Item> = Part<Episode<ListItem>>
export type HistoryDataPartListItem<P extends HistoryDataPart<any>> = P extends HistoryDataPart<infer T> ? T : unknown
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
export interface HistoryArchivePart <ListItem extends Item> {
  archive?: HistoryArchiveData<ListItem>
}
export interface HistoryChoicePart<ListItem extends Item> {
  choice?: HistoryChoiceData<ListItem>
}
export interface HistoryImportPart<ListItem extends Item> {
  import?: HistoryImportData<ListItem>
}
export interface HistoryRandomPart<ListItem extends Item> {
  random?: HistoryRandomData<ListItem>
}
export interface HistoryRemovePart<ListItem extends Item> {
  remove?: HistoryRemoveData<ListItem>
}
export interface HistoryResetPart<ListItem extends Item> {
  reset?: HistoryResetData<ListItem>
}
export interface HistoryUnarchivePart<ListItem extends Item> {
  unarchive?: HistoryUnarchiveData<ListItem>
}
export interface Episode<ListItem extends Item> extends Identity, HistoryArchivePart<ListItem>, HistoryChoicePart<ListItem>, HistoryImportPart<ListItem>, HistoryRandomPart<ListItem>, HistoryRemovePart<ListItem>, HistoryResetPart<ListItem>, HistoryUnarchivePart<ListItem> {
  createdAt: number
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
export type StoredState<ListItem extends Item> = Pick<State<ListItem>, 'seed' | 'history'>
