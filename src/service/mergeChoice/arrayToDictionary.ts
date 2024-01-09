import { Id, Identity } from './merge-choice-types'

export default function arrayToDictionary <Element extends Identity> (props: {
  array: Element[]
}): Record<Id, Element> {
  const dictionary = props.array.reduce<Record<Id, Element>>((dictionary, element) => {
    dictionary[element.id] = element
    return dictionary
  }, {})
  return dictionary
}
