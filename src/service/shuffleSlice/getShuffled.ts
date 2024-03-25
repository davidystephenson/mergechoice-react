import range from './range'

export default function getShuffled<Element> (
  array: Element[]
): Element[] {
  const indices = range(array.length)
  const randoms = indices.map(() => Math.random())
  indices.sort((i, j) => randoms[i] - randoms[j])
  return indices.map(i => array[i])
}
