import { ArrowLeftIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import useHistoryEventContext from '../context/historyEvent/useHistoryEventContext'

export default function RewindButtonView (): JSX.Element {
  const historyEventContextValue = useHistoryEventContext()
  function handleClick (): void {
    void historyEventContextValue.rewind()
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
