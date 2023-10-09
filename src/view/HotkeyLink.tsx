import MovieLink from './MovieLink'
import { useHotkeys } from 'react-hotkeys-hook'
import useMovieContext from '../context/movie/useMovieContext'

export default function OptionLinkView ({
  openHotkey
}: {
  openHotkey: string
}): JSX.Element {
  const movieContextValue = useMovieContext()
  useHotkeys(openHotkey, movieContextValue.open)
  return (
    <MovieLink>
      ({openHotkey}) {movieContextValue.imdbId}
    </MovieLink>
  )
}
