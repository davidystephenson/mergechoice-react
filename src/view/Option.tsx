import { Button, ButtonProps, HStack, Text, VStack } from '@chakra-ui/react'
import { MouseEvent, ReactNode } from 'react'
import Clink from 'clink-react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import useOptionContext from '../context/option/useOptionContext'
import useListContext from '../context/list/useListContext'
import MovieProvider from '../context/movie/MovieProvider'

export default function OptionView ({
  children,
  ...restProps
}: {
  children?: ReactNode
} & ButtonProps): JSX.Element {
  const listContextValue = useListContext()
  const optionContextValue = useOptionContext()
  const url = `https://www.imdb.com/title/${optionContextValue.item.imdbId}`
  function open (event: MouseEvent<HTMLAnchorElement>): void {
    event.preventDefault()
    window.open(url, '_blank')
  }
  function handleClick (): void {
    optionContextValue.choose()
  }
  return (
    <MovieProvider movie={optionContextValue.item}>
      <VStack>
        <Button
          isLoading={listContextValue.choosing}
          onClick={handleClick}
          {...restProps}
        >
          {children} {optionContextValue.item.title}
        </Button>
        <Clink to={url} target='_blank' onClick={open}>
          <HStack alignItems='baseline'>
            <Text>{optionContextValue.item.imdbId}</Text>
            <ExternalLinkIcon />
          </HStack>
        </Clink>
      </VStack>
    </MovieProvider>
  )
}
