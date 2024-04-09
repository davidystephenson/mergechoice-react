import { Identity } from './mergeChoiceTypes'

export default function arrayToDictionary <Element extends Identity> (props: {
  array: Element[]
}): Record<number, Element> {
  const dictionary = props.array.reduce<Record<number, Element>>((dictionary, element) => {
    dictionary[element.mergeChoiceId] = element
    return dictionary
  }, {})
  return dictionary
}
