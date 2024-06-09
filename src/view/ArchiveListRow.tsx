import { IconButton, Td, Text } from '@chakra-ui/react'
import DeleteButton from './DeleteButton'
import { UnlockIcon } from '@chakra-ui/icons'
import MovieLink from './MovieLink'
import useMovieContext from '../context/movie/useMovieContext'

export default function ArchiveListRowView (): JSX.Element {
  const movieContextValue = useMovieContext()
  function handleUnarchive (): void {
    void movieContextValue.unarchive()
  }
  return (
    <>
      <Td><MovieLink /></Td>
      <Td>
        <Text>{movieContextValue.seed}</Text>
      </Td>
      <Td>
        <IconButton
          aria-label='delete'
          icon={<UnlockIcon />}
          onClick={handleUnarchive}
        />
        <DeleteButton />
      </Td>
    </>
  )
}
