import { HStack, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import useOptionContext from '../context/option/useOptionContext'
import MovieProvider from '../context/movie/MovieProvider'
import HotkeyLink from './HotkeyLink'

export default function OptionView ({
  children,
  openHotkey
}: {
  openHotkey: string
  children?: ReactNode
}): JSX.Element {
  const optionContextValue = useOptionContext()
  return (
    <MovieProvider movie={optionContextValue.movie}>
      <VStack spacing='0'>
        <HStack gap='0'>
          {children}
        </HStack>
        <HotkeyLink openHotkey={openHotkey} />
      </VStack>
    </MovieProvider>
  )
}
