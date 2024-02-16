import { CalculatedMovie } from '../../types'

export default function compareMovies (props: {
  a: CalculatedMovie
  b: CalculatedMovie
  worseFirst?: boolean
}): number {
  if (props.a.points === props.b.points) {
    if (props.b.score === props.a.score) {
      if (props.a.updatedAt === props.b.updatedAt) {
        return props.b.name.localeCompare(props.a.name) * -1
      }
      return props.b.updatedAt - props.a.updatedAt
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
