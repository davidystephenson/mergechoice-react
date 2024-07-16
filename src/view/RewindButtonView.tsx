import { ArrowLeftIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import useEpisodeContext from '../context/historyEvent/useHistoryEventContext'

export default function RewindButtonView (): JSX.Element {
  const episodeContextValue = useEpisodeContext()
  function handleClick (): void {
    void episodeContextValue.rewind()
  }
  return (
    <IconButton
      aria-label='Rewind choice'
      icon={<ArrowLeftIcon />}
      size='xs'
      onClick={handleClick}
      variant='link'
    />
  )
}
