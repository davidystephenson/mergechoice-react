import { ChangeEvent, useContext, useRef, useState } from 'react'
import { Button, Center, HStack, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import Papa from 'papaparse'
import OptionView from './view/Option'
import listContext from './context/list'
import DeferView from './view/Defer'
import { CritickerMovie, CritickerRow } from './types'
import { useHotkeys } from 'react-hotkeys-hook'


export default function Movies (): JSX.Element {
  const listContextValue = useContext(listContext)
  const [initializing, setInitializing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  useHotkeys('a', () => {
    if (listContextValue == null) {
      throw new Error('There is no list context.')
    }
    listContextValue.applyChoice({
      optionIndex: listContextValue.state.choice.leftIndex
    })
  })
  useHotkeys('b', () => {
    if (listContextValue == null) {
      throw new Error('There is no list context.')
    }
    listContextValue.applyChoice({
      optionIndex: listContextValue.state.choice.rightIndex
    })
  })
  useHotkeys('d', () => {
    if (listContextValue == null) {
      throw new Error('There is no list context.')
    }
    if (listContextValue.defaultOptionIndex == null) {
      console.warn('There is no default option index.')
      return
    }
    listContextValue.applyChoice({
      optionIndex: listContextValue.defaultOptionIndex
    })
  })
  if (listContextValue == null) {
    throw new Error('There is no list context.')
  }
  function handleFileChange (e: ChangeEvent<HTMLInputElement>): void {
    if (listContextValue == null) {
      throw new Error('There is no criticker state.')
    }
    const file = e.target.files?.[0]
    if (file == null) {
      throw new Error('There is no file.')
    }
    setInitializing(true)
    Papa.parse<CritickerRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const items: CritickerMovie[] = results.data.map((row: CritickerRow) => {
          const date = new Date(row[' Date Rated'])
          const score = Number(row.Score)
          const year = Number(row[' Year'])
          return {
            date,
            id: row[' IMDB ID'],
            imdbId: row[' IMDB ID'],
            review: row[' Mini Review'],
            score,
            title: row[' Film Name'],
            year,
            url: row[' URL'],
            points: 0
          }
        })
        listContextValue.populate({ items })
        setInitializing(false)
      }
    })
  }
  const itemViews = listContextValue.state.items.map(item => {
    return (
      <Tr key={item.id}>
        <Td>{item.title}</Td>
        <Td>{item.points}</Td>
        <Td>{item.score}</Td>
      </Tr>
    )
  })
  return (
    <>
      <HStack flexWrap='wrap'>
        <OptionView
          optionIndex={listContextValue.state.choice.leftIndex}
        >
          [A]
        </OptionView>
        <OptionView
          optionIndex={listContextValue.state.choice.rightIndex}
        >
          [B]
        </OptionView>
      </HStack>
      <DeferView />
      <Button
        isLoading={initializing}
        onClick={() => inputRef.current?.click()}
      >
        Import
      </Button>
      <input
        hidden
        type='file'
        ref={inputRef}
        onChange={handleFileChange}
      />
      <Center>
        <Table>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Points</Th>
              <Th>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {itemViews}
          </Tbody>
        </Table>
      </Center>
    </>
  )
}