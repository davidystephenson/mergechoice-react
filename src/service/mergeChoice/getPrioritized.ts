import { Prioritized } from './merge-choice-types'

export default function getPrioritized<Element extends Prioritized> (
  array: Element[]
): Element {
  const highest = array.reduce((acc, item) => {
    return item.priority > acc.priority ? item : acc
  }, array[0])
  return highest
}
