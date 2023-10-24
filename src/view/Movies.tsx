import { HStack, Table, Tbody, VStack, Heading, Text, Th, Tr } from '@chakra-ui/react'
import OptionView from './Option'
import DeferView from './Defer'
import useMoviesContext from '../context/movies/useMoviesContext'
import OptionProvider from '../context/option/OptionProvider'
import HistoryView from './History'
import ImportButtonView from './ImportButton'
import HeadingRowView from './HeadingRow'
import HistoryProvider from '../context/history/HistoryProvider'
import MovieRows from './MovieRows'
import RandomButtonView from './RandomButton'
import ChoiceCounterView from './ChoiceCounter'

export default function MoviesView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  const headingsView = moviesContextValue.activeItems.length > 0 && (
    <Tr>
      <Th>
        <HStack>
          <Text w='max-content'>Movie</Text>
        </HStack>
      </Th>
      <Th>Points</Th>
      <Th colSpan={2}>Score</Th>
    </Tr>
  )
  const countView = moviesContextValue.activeItems.length > 0 && (
    <>({moviesContextValue.activeItems.length})</>
  )
  return (
    <VStack spacing='0'>
      <Heading textAlign='center'>
        Mergechoice (React)
        <ChoiceCounterView />
      </Heading>
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
      <Table size='sm'>
        <Tbody>
          <HistoryProvider>
            <HistoryView />
          </HistoryProvider>
          <HeadingRowView>
            <Heading size='sm'>List {countView}</Heading>
            <RandomButtonView />
            <ImportButtonView />
          </HeadingRowView>
          {headingsView}
          <HeadingRowView>
            <Text>Better</Text>
          </HeadingRowView>
          <MovieRows movies={moviesContextValue.betterItems} />
          <HeadingRowView>
            <Text>Active</Text>
          </HeadingRowView>
          <MovieRows movies={moviesContextValue.activeItems} />
          <HeadingRowView>
            <Text>Worse</Text>
          </HeadingRowView>
          <MovieRows movies={moviesContextValue.worseItems} />
          <HeadingRowView>
            <Text>Reserve</Text>
          </HeadingRowView>
          <MovieRows movies={moviesContextValue.reserveItems} />
        </Tbody>
      </Table>
    </VStack>
  )
}
