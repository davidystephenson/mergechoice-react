import { ItemId, Identity } from './merge-choice-types'

export default function arrayToDictionary <Element extends Identity> (props: {
  array: Element[]
}): Record<ItemId, Element> {
  const dictionary = props.array.reduce<Record<ItemId, Element>>((dictionary, element) => {
    dictionary[element.mergeChoiceId] = element
    return dictionary
  }, {})
  return dictionary
}
