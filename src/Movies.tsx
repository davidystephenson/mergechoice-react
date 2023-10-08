import { useContext } from 'react'
import { Center, HStack, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import OptionView from './view/Option'
import listContext from './context/list'
import DeferView from './view/Defer'

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
      <DeferView />
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