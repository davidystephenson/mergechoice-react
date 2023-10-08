export default function getRandom<Element>(
  array: Element[]
): Element {
  return array[Math.floor(Math.random() * array.length)]
}