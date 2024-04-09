import { VStack, HStack, Heading, Button } from '@chakra-ui/react'
import OptionProvider from '../context/option/OptionProvider'
import ChoiceCounterView from './ChoiceCounter'
import DeferView from './Defer'
import OptionView from './Option'
import useMoviesContext from '../context/movies/useMoviesContext'
import DeleteButton from './DeleteButton'
import OptionButtonView from './OptionButton'

export default function ChoiceView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  function handleUndo (): void {
    moviesContextValue.undo()
  }
  return (
    <VStack spacing='0'>
      <Button onClick={handleUndo}>Undo</Button>
      <HStack mb='5px'>
        <Heading>
          CloudSort
        </Heading>
        <ChoiceCounterView />
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
