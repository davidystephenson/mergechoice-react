export interface Item {
  id: string
  score: number
  title: string
  points: number
}
export interface CritickerMovie extends Item {
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
export interface ListContextValue {
  applyChoice: ({ optionIndex }: { optionIndex: number }) => void
  defaultOptionIndex: number | undefined
  state: State
  populate: ({ items }: { items: Item[] }) => void
}
export interface CritickerRow {
  ' Date Rated': string
  ' Film Name': string
  ' Year': string
  ' Mini Review': string
  ' URL': string
  ' IMDB ID': string
  Score: string
}