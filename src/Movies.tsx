import { useContext } from 'react'
import { Center, HStack, Table, Tbody, Td, Tr } from '@chakra-ui/react'
import OptionView from './view/Option'
import listContext from './context/list'

export default function Movies (): JSX.Element {
  const listContextValue = useContext(listContext)
  if (listContextValue == null) {
    throw new Error('listContextValue is null')
  }
  const itemViews = listContextValue.state.items.map(item => {
    const { id, label, points } = item
    return (
      <Tr key={id}>
        <Td>{label}</Td>
        <Td>{points}</Td>
      </Tr>
    )
  })
  if (listContextValue.state.finalized) {
    console.log('finalized', listContextValue.state)
  }
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
      <Center>
        <Table>
          <Tbody>
            {itemViews}
          </Tbody>
        </Table>
      </Center>
    </>
  )
}