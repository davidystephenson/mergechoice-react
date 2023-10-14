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
  points: number
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
  steps: number
}
export interface Choice {
  options: string[]
  currentOperationIndex: number
  aIndex: number
  bIndex: number
}
export interface State {
  items: Movie[]
  betterItems: Movie[]
  worseItems: Movie[]
  populatingItems: Movie[]
  operations: Operation[]
  oldOperations: Operation[]
  choice?: Choice
  finalized: boolean
}
export interface HistoryEvent {
  aBetter: boolean
  aId: string
  aItem: Movie
  bId: string
  bItem: Movie
  createdAt: number
  id: string
  previousState?: State
}
export interface MoviesContextValue extends State {
  applyChoice: ({ optionIndex }: { optionIndex: number }) => void
  choosing: boolean
  defaultOptionIndex: number | undefined
  movies: Movie[]
  populate: ({ movies }: { movies: Movie[] }) => void
  removeMovie: ({ id }: { id: string }) => void
  history: HistoryEvent[]
  rewind: ({ historyEventId }: { historyEventId: string }) => void
  state: State
}
export interface MovieContextValue extends Movie {
  label: string
  open: () => void
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
