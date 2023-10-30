import { VStack, HStack, Heading } from '@chakra-ui/react'
import OptionProvider from '../context/option/OptionProvider'
import ChoiceCounterView from './ChoiceCounter'
import DeferView from './Defer'
import OptionView from './Option'
import useMoviesContext from '../context/movies/useMoviesContext'

export default function ChoiceView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  return (
    <VStack spacing='0'>
      <HStack mb='5px'>
        <Heading>
          Mergechoice (React)
        </Heading>
        <ChoiceCounterView />
      </HStack>
      <HStack flexWrap='wrap' justifyContent='center'>
        <OptionProvider
          chooseHotkey='a'
          openHotkey='c'
          optionIndex={moviesContextValue.choice?.aIndex}
        >
          <OptionView />
        </OptionProvider>
        <OptionProvider
          optionIndex={moviesContextValue.choice?.bIndex}
          chooseHotkey='b'
          openHotkey='v'
        >
          <OptionView />
        </OptionProvider>
      </HStack>
      <DeferView />
    </VStack>
  )
}
