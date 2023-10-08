import { useContext } from 'react'
import { Center, HStack, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import OptionView from './view/Option'
import listContext from './context/list'
import findById from './service/findById'
import { Item } from './types'

export default function Movies (): JSX.Element {
  const listContextValue = useContext(listContext)
  if (listContextValue == null) {
    throw new Error('listContextValue is null')
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
  if (listContextValue.state.finalized) {
    console.log('finalized', listContextValue.state)
  }
  const choiceItems = listContextValue.state.choice.options.map(option => {
    return findById({
      items: listContextValue.state.items,
      id: option
    })
  })
  const [firstItem, secondItem] = choiceItems
  const defaultItem = firstItem.score === secondItem.score
    ? undefined 
    : firstItem.score > secondItem.score
      ? firstItem
      : secondItem
  const defaultOptionIndex = listContextValue.state.choice.options.findIndex(option => {
    return option === defaultItem?.id
  })
  const deferView = defaultOptionIndex !== -1 && (
    <OptionView optionIndex={defaultOptionIndex}>
      Defer
    </OptionView>
  )
  return (
    <>
      <HStack>
        <OptionView
          optionIndex={listContextValue.state.choice.leftIndex}
        />
        <OptionView
          optionIndex={listContextValue.state.choice.rightIndex}
        />
      </HStack>
      {deferView}
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