import { Movie } from '../../types'
import findById from '../mergeChoice/findById'
import { Choice } from '../mergeChoice/types'

export default function getDefaultOptionIndex ({
  choice,
  movies
}: {
  choice: Choice | undefined
  movies: Movie[]
}): number | undefined {
  if (choice == null || choice.options.length === 0) {
    return undefined
  }
  const choiceItems = choice.options.map(option => {
    return findById({
      items: movies,
      id: option
    })
  })
  const [firstItem, secondItem] = choiceItems
  const defaultItem = firstItem.score === secondItem.score
    ? undefined
    : firstItem.score > secondItem.score
      ? firstItem
      : secondItem
  const defaultOptionIndex = choice.options.findIndex(option => {
    return option === defaultItem?.id
  })
  if (defaultOptionIndex === -1) {
    return undefined
  }
  return defaultOptionIndex
}
