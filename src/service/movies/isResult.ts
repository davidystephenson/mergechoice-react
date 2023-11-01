import { CalculatedMovie } from '../../types'
import searchMovie from './searchMovie'

export default function isResult ({
  movie,
  query
}: {
  movie: CalculatedMovie
  query: string
}): boolean {
  if (query === '') {
    return true
  }
  const key = searchMovie({ movie, query })
  return key != null
}
