import { HStack, VStack, Heading } from '@chakra-ui/react'
import OptionView from './Option'
import DeferView from './Defer'
import useMoviesContext from '../context/movies/useMoviesContext'
import OptionProvider from '../context/option/OptionProvider'
import HistoryProvider from '../context/history/HistoryProvider'
import MovieTableView from './MovieTable'
import ChoiceCounterView from './ChoiceCounter'

export default function MoviesView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  return (
    <>
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
      <HistoryProvider>
        <MovieTableView />
      </HistoryProvider>
    </>
  )
}
