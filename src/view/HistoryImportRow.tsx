import { Text, Td, Icon, HStack } from '@chakra-ui/react'
import MovieLink from './MovieLink'
import useMovieContext from '../context/movie/useMovieContext'
import useHistoryEventContext from '../context/historyEvent/useHistoryEventContext'
import { BsCloudUpload } from 'react-icons/bs'

export default function HistoryImportRowView (): JSX.Element {
  const historyEventContextValue = useHistoryEventContext()
  const movieContextValue = useMovieContext()
  if (historyEventContextValue.import == null) {
    throw new Error('HistoryImportCellsView must be used with an import event.')
  }
  return (
    <>
      <Td>
        <MovieLink />
      </Td>
      <Td>
        <Text>{movieContextValue.seed}</Text>
      </Td>
      <Td>
        <HStack>
          <Text>0</Text>
          <Icon as={BsCloudUpload} />
        </HStack>
      </Td>
    </>
  )
}
