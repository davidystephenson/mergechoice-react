export interface CritickerRow {
  ' Date Rated': string
  ' Film Name': string
  ' Year': string
  ' Mini Review': string
  ' URL': string
  ' IMDB ID': string
  Score: string
}
export interface Item {
  id: string
  score: number
  title: string
  points: number
  date: Date
  imdbId: string
  review: string
  year: number
  url: string
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
  items: Item[]
  operations: Operation[]
  choice: Choice
  finalized: boolean
}
export interface Review {
  betterId: string
  worseId: string
}
export interface ListContextValue {
  applyChoice: ({ optionIndex }: { optionIndex: number }) => void
  choosing: boolean
  defaultOptionIndex: number | undefined
  populate: ({ items }: { items: Item[] }) => void
  state: State
  review: Review | undefined
}
export interface OptionContextValue {
  item: Item
  optionIndex: number
}
