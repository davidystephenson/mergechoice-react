import { CalculatedMovie } from '../../types'

export default function compareMovies (props: {
  a: CalculatedMovie
  b: CalculatedMovie
  worseFirst?: boolean
}): number {
  if (props.a.points === props.b.points) {
    if (props.b.seed === props.a.seed) {
      return props.b.name.localeCompare(props.a.name) * -1
    }
    if (props.worseFirst === true) {
      return props.a.seed - props.b.seed
    }
    return props.b.seed - props.a.seed
  }
  if (props.worseFirst === true) {
    return props.a.points - props.b.points
  }
  return props.b.points - props.a.points
}
