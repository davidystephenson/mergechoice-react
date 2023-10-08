import { Container, Heading } from '@chakra-ui/react'
import ListProvider from './context/list/ListProvider'
import Movies from './Movies'

export default function App (): JSX.Element {
  return (
    <Container>
      <Heading textAlign='center'>Mergechoice (React)</Heading>
      <ListProvider>
        <Movies />
      </ListProvider>
    </Container>
  )
}
