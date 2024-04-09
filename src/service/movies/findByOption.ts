import { Movie } from '../../types'
import { Choice } from '../mergeChoice/mergeChoiceTypes'

export default function findByOption ({
  choice,
  finalized,
  movies,
  optionIndex
}: {
  choice: Choice
  finalized: boolean
  movies: Record<string, Movie>
  optionIndex: number
}): Movie | undefined {
  if (finalized) {
    return undefined
  }
  const itemId = choice.options[optionIndex]
  if (itemId == null) {
    return undefined
  }
  const movie = movies[itemId]
  return movie
}
