import { Button, ButtonProps } from '@chakra-ui/react'
import { ReactNode } from 'react'
import useOptionContext from '../context/option/useOptionContext'
import useMoviesContext from '../context/movies/useMoviesContext'
import { useHotkeys } from 'react-hotkeys-hook'
import useMovieContext from '../context/movie/useMovieContext'

export default function OptionButtonView ({
  children,
  ...restProps
}: {
  children?: ReactNode
} & ButtonProps): JSX.Element {
  const moviesContextValue = useMoviesContext()
  const movieContextValue = useMovieContext()
  const optionContextValue = useOptionContext()
  function handleClick (): void {
    optionContextValue.choose()
  }
  useHotkeys(optionContextValue.chooseHotkey, () => {
    optionContextValue.choose()
  })
  const content = children ?? (
    <>
      [{optionContextValue.chooseHotkey}]
      {' '}
      {movieContextValue.title}
      {' '}
      ({movieContextValue.year})
    </>
  )
  return (
    <Button
      isLoading={moviesContextValue.choosing}
      onClick={handleClick}
      {...restProps}
    >
      {content}
    </Button>
  )
}
