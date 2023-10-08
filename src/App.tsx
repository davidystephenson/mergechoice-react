import { Container, Heading } from '@chakra-ui/react'
import ListProvider from './context/list/Provider'
import Movies from './Movies'

function App() {
  return (
    <Container>
      <Heading textAlign='center'>Mergechoice (React)</Heading>
      <ListProvider>
        <Movies />
      </ListProvider>
    </Container>
  )
}

export default App
