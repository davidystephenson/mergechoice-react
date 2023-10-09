import { Container, Heading } from '@chakra-ui/react'
import MoviesProvider from './context/movies/MoviesProvider'
import Movies from './Movies'

export default function App (): JSX.Element {
  return (
    <Container>
      <Heading textAlign='center'>Mergechoice (React)</Heading>
      <MoviesProvider>
        <Movies />
      </MoviesProvider>
    </Container>
  )
}
