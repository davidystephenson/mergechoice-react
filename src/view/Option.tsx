import { ButtonProps, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import useOptionContext from '../context/option/useOptionContext'
import MovieProvider from '../context/movie/MovieProvider'
import HotkeyLink from './HotkeyLink'
import OptionButtonView from './OptionButton'

export default function OptionView ({
  children,
  ...restProps
}: {
  children?: ReactNode
} & ButtonProps): JSX.Element {
  const optionContextValue = useOptionContext()
  const linkView = optionContextValue.openHotkey != null && (
    <HotkeyLink openHotkey={optionContextValue.openHotkey} />
  )
  return (
    <MovieProvider movie={optionContextValue.movie}>
      <VStack>
        <OptionButtonView {...restProps}>
          {children}
        </OptionButtonView>
        {linkView}
      </VStack>
    </MovieProvider>
  )
}
