import { Calculated, CountRange, HistoryEvent, Item, State } from './service/mergeChoice/types'

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
export interface SortedMovies {
  active: Movie[]
  better: Movie[]
  reserve: Movie[]
  worse: Movie[]
}
export interface MoviesContextValue extends State<Movie> {
  choiceCount: CountRange
  choose: ({ betterIndex }: { betterIndex: number }) => Promise<void>
  choosing: boolean
  createRandomMovieChoice: () => Promise<void>
  defaultOptionIndex: number | undefined
  importMovies: ({ movies }: { movies: Movie[] }) => Promise<void>
  removeMovie: ({ id }: { id: string }) => Promise<void>
  history: Array<HistoryEvent<Movie>>
  random: boolean
  rewind: ({ historyEventId }: { historyEventId: string }) => Promise<void>
  sortedMovies: SortedMovies
  state: State<Movie>
}
export interface MovieContextValue extends Movie {
  label: string
  open: () => void
  points: number
  remove: () => Promise<void>
  url: string
}
export interface OptionContextValue {
  choose: () => Promise<void>
  chooseHotkey: string
  movie: Movie
  optionIndex: number
  openHotkey?: string
}
export interface HistoryContextValue {
  events: Array<HistoryEvent<Movie>>
  expanded: boolean
  firstEvent: HistoryEvent<Movie> | undefined
  isSingle: boolean
  restEvents: Array<HistoryEvent<Movie>>
  toggleExpanded: () => void
}
export interface HistoryEventContextValue extends HistoryEvent<Movie> {
  rewind: () => Promise<void>
  timestamp: string
}
