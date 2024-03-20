import { Calculated, CountRange, HistoryEvent, ItemId, Item, State } from './service/mergeChoice/merge-choice-types'

export interface CritickerRow {
  ' Date Rated': string
  ' Film Name': string
  ' Year': string
  ' Mini Review': string
  ' URL': string
  ' IMDB ID': string
  Score: string
}
export interface Movie extends Item {
  score: number
  date: Date
  imdbId: string
  review: string
  url: string
  year: number
}
export type CalculatedMovie = Calculated<Movie>
export interface ListTableItem {
  movie: CalculatedMovie
}
export interface HistoryTableItem {
  event: HistoryEvent<Movie>
}
export interface HistoryImportTableItem {
  event: HistoryEvent<Movie>
  movie: Movie
}
export interface HistoryRemoveTableItem {
  event: HistoryEvent<Movie>
  movie: CalculatedMovie
}
export interface TableItem {
  list?: ListTableItem
  historyChoiceHeading?: HistoryTableItem
  historyChoiceA?: HistoryTableItem
  historyChoiceB?: HistoryTableItem
  historyHeading?: boolean
  historyImportHeading?: HistoryTableItem
  historyImportMovie?: HistoryImportTableItem
  historyRemoveHeading?: HistoryTableItem
  historyRemoveMovie?: HistoryRemoveTableItem
  movieHeading?: boolean
  movieHeadings?: boolean
  search?: boolean
}
export interface MoviesContextValue extends State<Movie> {
  choiceCountRange: CountRange
  choose: ({ betterIndex }: { betterIndex: number }) => Promise<void>
  choosing: boolean
  createRandomMovieChoice: () => Promise<void>
  defaultOptionIndex: number | undefined
  history: Array<HistoryEvent<Movie>>
  importMovies: (porps: { movies: Movie[], slice?: number }) => Promise<void>
  query: string
  random: boolean
  removeMovie: ({ id }: { id: ItemId }) => Promise<void>
  resetMovie: ({ id }: { id: ItemId }) => Promise<void>
  resultMovies: CalculatedMovie[]
  rewind: ({ historyEventId }: { historyEventId: ItemId }) => Promise<void>
  searching: boolean
  sortedMovies: CalculatedMovie[]
  state: State<Movie>
  setQuery: (query: string) => void
}
export interface MovieContextValue extends Movie {
  label: string
  open: () => void
  points: number
  remove: () => Promise<void>
  reset: () => Promise<void>
  url: string
}
export interface OptionContextValue {
  choose: () => Promise<void>
  chooseHotkey: string
  movie: Movie
  optionIndex: number
}
export interface HistoryContextValue {
  closeEvent: (id: ItemId) => void
  events: Array<HistoryEvent<Movie>>
  expanded: boolean
  firstEvent: HistoryEvent<Movie> | undefined
  isSingle: boolean
  toggleEvent: (id: ItemId) => void
  openIds: ItemId[]
  resultEvents: Array<HistoryEvent<Movie>>
  restEvents: Array<HistoryEvent<Movie>>
  toggleExpanded: () => void
}
export interface HistoryEventContextValue extends HistoryEvent<Movie> {
  rewind: () => Promise<void>
  timestamp: string
}
export interface TableItemContextValue extends TableItem {
}
