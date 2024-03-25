import Rand from 'rand-seed'

export default function getRandom (props: {
  seed: string
}): number {
  const rand = new Rand(props.seed)
  const random = rand.next()
  return random
}
