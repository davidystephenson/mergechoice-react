export default function getStorage <Stored> ({
  key,
  defaultValue
}: {
  defaultValue: Stored
  key: string
}): Stored {
  const stateString = localStorage.getItem(key)
  if (stateString == null) {
    return defaultValue
  }
  const state = JSON.parse(stateString)
  return state
}
