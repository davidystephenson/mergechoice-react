import { HStack, Heading, VStack } from '@chakra-ui/react'
import useMoviesContext from '../context/movies/useMoviesContext'
import OptionProvider from '../context/option/OptionProvider'
import ChoiceCounterView from './ChoiceCounter'
import DeferView from './Defer'
import DeleteButton from './DeleteButton'
import OptionView from './Option'
import OptionButtonView from './OptionButton'
import ResetView from './Reset'

export default function ChoiceView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  return (
    <VStack spacing='0'>
      <HStack mb='5px'>
        <Heading>
          CloudSort
        </Heading>
        <ChoiceCounterView />
        <ResetView />
      </HStack>
      <HStack flexWrap='wrap' justifyContent='center'>
        <OptionProvider
          chooseHotkey='a'
          optionIndex={moviesContextValue.choice?.aIndex}
        >
          <OptionView openHotkey='c'>
            <DeleteButton />
            <OptionButtonView />
          </OptionView>
        </OptionProvider>
        <OptionProvider
          optionIndex={moviesContextValue.choice?.bIndex}
          chooseHotkey='b'
        >
          <OptionView openHotkey='v'>
            <OptionButtonView />
            <DeleteButton />
          </OptionView>
        </OptionProvider>
      </HStack>
      <DeferView />
    </VStack>
  )
}
