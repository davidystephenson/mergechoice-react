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
  points?: number
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
  random: boolean
}
export interface State {
  activeItems: Movie[]
  betterItems: Movie[]
  worseItems: Movie[]
  reserveItems: Movie[]
  operations: Operation[]
  reserveOperations: Operation[]
  choice?: Choice
  finalized: boolean
}
export interface HistoryMovie extends Movie {
  points: number
}
export interface HistoryEvent {
  aBetter: boolean
  aId: string
  aItem: HistoryMovie
  bId: string
  bItem: HistoryMovie
  createdAt: number
  id: string
  previousState?: State
}
export interface MoviesContextValue extends State {
  applyChoice: ({ optionIndex }: { optionIndex: number }) => void
  choosing: boolean
  createRandomMovieChoice: () => void
  defaultOptionIndex: number | undefined
  movies: Movie[]
  populateMovies: ({ movies }: { movies: Movie[] }) => void
  removeMovie: ({ id }: { id: string }) => void
  history: HistoryEvent[]
  rewind: ({ historyEventId }: { historyEventId: string }) => void
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
