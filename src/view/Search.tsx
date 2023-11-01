import { Input, Tr } from '@chakra-ui/react'
import SingleRowView from './SingleRow'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import useMoviesContext from '../context/movies/useMoviesContext'

export default function SearchView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  const inputRef = useRef<HTMLInputElement>(null)
  const [autoFocus, setAutoFocus] = useState(true)
  function handleChange (event: ChangeEvent<HTMLInputElement>): void {
    moviesContextValue.setQuery(event.target.value)
    setAutoFocus(true)
  }
  useEffect(() => {
    inputRef.current?.blur()
    setAutoFocus(false)
  }, [])
  return (
    <Tr background='var(--chakra-colors-chakra-body-bg)'>
      <SingleRowView py='0'>
        <Input ref={inputRef} value={moviesContextValue.query} variant='flushed' placeholder='Search' onChange={handleChange} autoFocus={autoFocus} />
      </SingleRowView>
    </Tr>
  )
}
