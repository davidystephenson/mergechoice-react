import { Text, Tr, Td, Icon } from '@chakra-ui/react'
import MovieLink from './MovieLink'
import useMovieContext from '../context/movie/useMovieContext'
import useHistoryEventContext from '../context/historyEvent/useHistoryEventContext'
import { BsCloudUpload } from 'react-icons/bs'

export default function HistoryImportRowView (): JSX.Element {
  const historyEventContextValue = useHistoryEventContext()
  const movieContextValue = useMovieContext()
  if (historyEventContextValue.import == null) {
    throw new Error('HistoryImportRowView must be used with an import event.')
  }
  return (
    <Tr>
      <Td>
        <MovieLink />
      </Td>
      <Td>
        <Text>0</Text>
      </Td>
      <Td>
        <Text>{movieContextValue.score}</Text>
      </Td>
      <Td textAlign='center'>
        <Icon as={BsCloudUpload} />
      </Td>
    </Tr>
  )
}
