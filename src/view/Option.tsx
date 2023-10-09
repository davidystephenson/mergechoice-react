import { Button, ButtonProps, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import useOptionContext from '../context/option/useOptionContext'
import useListContext from '../context/list/useListContext'
import MovieProvider from '../context/movie/MovieProvider'
import MovieLink from './MovieLink'

export default function OptionView ({
  children,
  ...restProps
}: {
  children?: ReactNode
} & ButtonProps): JSX.Element {
  const listContextValue = useListContext()
  const optionContextValue = useOptionContext()
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
        <MovieLink />
      </VStack>
    </MovieProvider>
  )
}
