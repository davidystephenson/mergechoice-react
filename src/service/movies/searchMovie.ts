import { CalculatedMovie } from '../../types'

export default function searchMovie ({
  movie,
  query
}: {
  movie: CalculatedMovie
  query: string
}): keyof CalculatedMovie | undefined {
  if (query === '') {
    return undefined
  }
  const lowerQuery = query.toLowerCase()
  const lowerName = movie.name.toLowerCase()
  if (lowerName.includes(lowerQuery)) {
    return 'name'
  }
  const lowerYear = movie.year.toString().toLowerCase()
  if (lowerYear.includes(lowerQuery)) {
    return 'year'
  }
  if (lowerQuery.startsWith('tt')) {
    const lowerImdbId = movie.imdbId.toLowerCase()
    if (lowerImdbId.includes(lowerQuery)) {
      return 'imdbId'
    }
  }
  const points = String(movie.points)
  if (points.includes(lowerQuery)) {
    return 'points'
  }
  const score = String(movie.score)
  if (score.includes(lowerQuery)) {
    return 'score'
  }
}
