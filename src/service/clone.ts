export default function clone<Serializable>(
  x: Serializable
): Serializable {
  return JSON.parse(JSON.stringify(x))
}