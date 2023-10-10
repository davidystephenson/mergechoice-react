import { Container, Heading } from '@chakra-ui/react'
import MoviesProvider from './context/movies/MoviesProvider'
import MoviesView from './view/Movies'

export default function App (): JSX.Element {
  return (
    <Container>
      <Heading textAlign='center'>Mergechoice (React)</Heading>
      <MoviesProvider>
        <MoviesView />
      </MoviesProvider>
    </Container>
  )
}
