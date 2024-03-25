import getRandom from './getRandom'

export default function getRandomRange (props: {
  seed: string
  maximum?: number
  minimum?: number
}): number {
  const maximum = props.maximum ?? 1
  const minimum = props.minimum ?? 0
  const random = getRandom({ seed: props.seed })
  const range = maximum - minimum
  const scaled = random * range
  const floored = Math.floor(scaled)
  const shifted = floored + minimum
  return shifted
}
