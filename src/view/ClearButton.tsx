import { SmallCloseIcon } from '@chakra-ui/icons'
import { InputRightElement, IconButton } from '@chakra-ui/react'
import useMoviesContext from '../context/movies/useMoviesContext'

export default function ClearButtonView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  if (moviesContextValue.query === '') {
    return <></>
  }
  function handleClear (): void {
    moviesContextValue.setQuery('')
  }
  return (
    <InputRightElement>
      <IconButton onClick={handleClear} aria-label='clear' icon={<SmallCloseIcon />} />
    </InputRightElement>
  )
}
