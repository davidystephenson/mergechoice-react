export default function mapDictionary <Value, Result> (props: {
  dictionary: Record<string, Value>
  map: (props: {
    value: Value
    index: number
    dictionary: Record<string, Value>
  }) => Result
}): Result[] {
  const results: Result[] = []
  let index = 0
  for (const key in props.dictionary) {
    const value = props.dictionary[key]
    const result = props.map({
      value,
      index,
      dictionary: props.dictionary
    })
    results.push(result)
    index += 1
  }
  return results
}
