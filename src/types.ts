import { Calculated, CountRange, Episode, ItemId, Item, State } from './service/mergechoice/mergeChoiceTypes'

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
  seed: number
  date: Date
  imdbId: string
  review: string
  url: string
  year: number
}
export type CalculatedMovie = Calculated<Movie>
export interface ArchiveTableItem {
  movie: Movie
}
export interface ListTableItem {
  movie: CalculatedMovie
}
export interface HistoryTableItem {
  episode: Episode<Movie>
}
export interface HistoryMovieTableItem {
  episode: Episode<Movie>
  movie: CalculatedMovie
}
export interface TableItem {
  archiveHeading?: boolean
  archiveList?: ArchiveTableItem
  list?: ListTableItem
  historyArchiveHeading?: HistoryTableItem
  historyArchiveMovie?: HistoryMovieTableItem
  historyChoiceHeading?: HistoryTableItem
  historyChoiceA?: HistoryTableItem
  historyChoiceB?: HistoryTableItem
  historyHeading?: boolean
  historyImportHeading?: HistoryTableItem
  historyImportMovie?: HistoryMovieTableItem
  historyRandomHeading?: HistoryTableItem
  historyRandomMovie?: HistoryMovieTableItem
  historyRemoveHeading?: HistoryTableItem
  historyRemoveMovie?: HistoryMovieTableItem
  historyResetHeading?: HistoryTableItem
  historyResetMovie?: HistoryMovieTableItem
  historyUnarchiveHeading?: HistoryTableItem
  historyUnarchiveMovie?: HistoryMovieTableItem
  movieHeading?: boolean
  movieHeadings?: boolean
  search?: boolean
}
export interface MoviesContextValue extends State<Movie> {
  archiveMovie: (props: { itemId: ItemId }) => Promise<void>
  choiceCountRange: CountRange
  choose: ({ betterIndex }: { betterIndex: number }) => Promise<void>
  choosing: boolean
  createRandomMovieChoice: () => Promise<void>
  defaultOptionIndex: number | undefined
  history: Array<Episode<Movie>>
  importMovies: (porps: { movies: Movie[], slice?: number }) => Promise<void>
  query: string
  random: boolean
  removeMovie: ({ itemId }: { itemId: ItemId }) => Promise<void>
  resetMovie: ({ itemId }: { itemId: ItemId }) => Promise<void>
  resultMovies: CalculatedMovie[]
  rewind: ({ episodeId }: { episodeId: ItemId }) => Promise<void>
  searching: boolean
  sortedMovies: CalculatedMovie[]
  state: State<Movie>
  setQuery: (query: string) => void
  unarchiveMovie: (props: { itemId: ItemId }) => Promise<void>
  undo: () => void
}
export interface MovieContextValue extends Movie {
  archive: () => Promise<void>
  label: string
  open: () => void
  points: number
  remove: () => Promise<void>
  reset: () => Promise<void>
  unarchive: () => Promise<void>
  url: string
}
export interface OptionContextValue {
  choose: () => Promise<void>
  chooseHotkey: string
  movie: Movie
  optionIndex: number
}
export interface HistoryContextValue {
  closeEpisode: (itemId: ItemId) => void
  episodes: Array<Episode<Movie>>
  expanded: boolean
  firstEpisode: Episode<Movie> | undefined
  isSingle: boolean
  toggleEpisode: (itemId: ItemId) => void
  openIds: ItemId[]
  resultEpisodes: Array<Episode<Movie>>
  restEpisodes: Array<Episode<Movie>>
  toggleExpanded: () => void
}
export type EpisodeContextValue = Episode<Movie> & {
  rewind: () => Promise<void>
  timestamp: string
}
export interface TableItemContextValue extends TableItem {
}
