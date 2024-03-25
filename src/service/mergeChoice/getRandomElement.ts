import getRandomRange from './getRandomRange'

export default function getRandomElement <Element> (props: {
  seed: string
  array: Element[]
}): Element {
  const random = getRandomRange({ seed: props.seed, maximum: props.array.length })
  const element = props.array[random]
  return element
}
