import { Input, InputGroup, Tr } from '@chakra-ui/react'
import SingleRowView from './SingleRow'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import useMoviesContext from '../context/movies/useMoviesContext'
import ClearButtonView from './ClearButton'
import { useHotkeys } from 'react-hotkeys-hook'

export default function SearchView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  const inputRef = useRef<HTMLInputElement>(null)
  const [autoFocus, setAutoFocus] = useState(true)
  function handleBlur (): void {
    setAutoFocus(false)
  }
  function handleChange (event: ChangeEvent<HTMLInputElement>): void {
    moviesContextValue.setQuery(event.target.value)
    setAutoFocus(true)
  }
  function handleKeyUp (event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Escape') {
      setAutoFocus(false)
      inputRef.current?.blur()
    }
  }
  useEffect(() => {
    inputRef.current?.blur()
    setAutoFocus(false)
  }, [])
  useHotkeys('ctrl+f', () => {
    event?.preventDefault()
    inputRef.current?.focus()
    setAutoFocus(true)
  })
  return (
    <Tr background='var(--chakra-colors-chakra-body-bg)'>
      <SingleRowView py='0'>
        <InputGroup>
          <Input
            ref={inputRef}
            value={moviesContextValue.query}
            variant='flushed'
            placeholder='Search'
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyDown={handleKeyUp}
            autoFocus={autoFocus}
          />
          <ClearButtonView />
        </InputGroup>
      </SingleRowView>
    </Tr>
  )
}
