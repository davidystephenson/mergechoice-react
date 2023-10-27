export interface CritickerRow {
  ' Date Rated': string
  ' Film Name': string
  ' Year': string
  ' Mini Review': string
  ' URL': string
  ' IMDB ID': string
  Score: string
}
export interface Movie {
  id: string
  score: number
  title: string
  date: Date
  imdbId: string
  review: string
  updatedAt: number
  url: string
  year: number
}
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
export interface HistoryMovie extends Movie {
  points: number
}
export interface HistoryEvent {
  createdAt: number
  id: string
  choice?: {
    aBetter: boolean
    aId: string
    aItem: HistoryMovie
    bId: string
    bItem: HistoryMovie
    random: boolean
  }
  remove?: {
    id: string
    item: HistoryMovie
  }
  import?: {
    items: Movie[]
  }
  previousState?: State
}
export interface State {
  activeItems: Movie[]
  betterItems: Movie[]
  worseItems: Movie[]
  reserveItems: Movie[]
  activeOperations: Operation[]
  betterOperations: Operation[]
  worseOperations: Operation[]
  choice?: Choice
  history: HistoryEvent[]
  finalized: boolean
}
export interface SortedItems {
  active: Movie[]
  better: Movie[]
  reserve: Movie[]
  worse: Movie[]
}
export interface MoviesContextValue extends State {
  choiceCount: CountRange
  choose: ({ betterIndex }: { betterIndex: number }) => Promise<void>
  choosing: boolean
  createRandomMovieChoice: () => Promise<void>
  defaultOptionIndex: number | undefined
  importMovies: ({ movies }: { movies: Movie[] }) => Promise<void>
  removeMovie: ({ id }: { id: string }) => Promise<void>
  history: HistoryEvent[]
  random: boolean
  rewind: ({ historyEventId }: { historyEventId: string }) => Promise<void>
  sortedMovies: SortedItems
  state: State
}
export interface MovieContextValue extends Movie {
  label: string
  open: () => void
  points: number
  remove: () => void
  url: string
}
export interface OptionContextValue {
  choose: () => void
  chooseHotkey: string
  movie: Movie
  optionIndex: number
  openHotkey?: string
}
export interface HistoryContextValue {
  events: HistoryEvent[]
  expanded: boolean
  firstEvent: HistoryEvent | undefined
  isSingle: boolean
  restEvents: HistoryEvent[]
  toggleExpanded: () => void
}
export interface HistoryEventContextValue extends HistoryEvent {
  rewind: () => void
  timestamp: string
}
export interface RemovalFromOperations {
  emptiedOperationIndex: number
  operations: Operation[]
}
export interface CountRange {
  maximum: number
  minimum: number
}
