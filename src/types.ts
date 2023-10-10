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
  leftIndex: number
  rightIndex: number
}
export interface State {
  items: Movie[]
  operations: Operation[]
  choice?: Choice
  finalized: boolean
}
export interface HistoryEvent {
  betterId: string
  betterItem: Movie
  createdAt: number
  id: string
  previousHistory: HistoryEvent[]
  previousState: State
  worseId: string
  worseItem: Movie
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
export interface HistoryEventContextValue extends HistoryEvent {
  betterMovie: Movie
  rewind: () => void
  worseMovie: Movie
}
