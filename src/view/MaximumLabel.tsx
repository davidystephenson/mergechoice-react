import { Icon } from '@chakra-ui/icons'
import useMoviesContext from '../context/movies/useMoviesContext'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'

export default function MinimumLabelView (): JSX.Element {
  const moviesContextValue = useMoviesContext()
  if (moviesContextValue.random) {
    return <Icon as={GiPerspectiveDiceSixFacesRandom} />
  }
  return <span>{moviesContextValue.maximumCount}</span>
}
