import { LockIcon } from '@chakra-ui/icons'
import useMovieContext from '../context/movie/useMovieContext'
import { IconButton } from '@chakra-ui/react'

export default function ArchiveButtonView (): JSX.Element {
  const movieContextValue = useMovieContext()
  function handleArchive (): void {
    void movieContextValue.archive()
  }
  return (
    <IconButton
      aria-label='delete'
      colorScheme='red'
      icon={<LockIcon />}
      onClick={handleArchive}
    />
  )
}
