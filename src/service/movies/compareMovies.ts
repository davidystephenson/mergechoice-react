import { CalculatedMovie } from '../../types'

export default function compareMovies (props: {
  a: CalculatedMovie
  b: CalculatedMovie
  worseFirst?: boolean
}): number {
  if (props.a.points === props.b.points) {
    if (props.b.score === props.a.score) {
      return props.b.name.localeCompare(props.a.name) * -1
    }
    if (props.worseFirst === true) {
      return props.a.score - props.b.score
    }
    return props.b.score - props.a.score
  }
  if (props.worseFirst === true) {
    return props.a.points - props.b.points
  }
  return props.b.points - props.a.points
}
