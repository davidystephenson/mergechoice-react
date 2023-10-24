import { Container } from '@chakra-ui/react'
import MoviesProvider from './context/movies/MoviesProvider'
import MoviesView from './view/Movies'

export default function App (): JSX.Element {
  return (
    <Container>
      <MoviesProvider>
        <MoviesView />
      </MoviesProvider>
    </Container>
  )
}
