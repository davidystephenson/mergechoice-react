import { LockIcon, ArrowLeftIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import useHistoryEventContext from '../context/historyEvent/useHistoryEventContext'

export default function RewindButtonView (): JSX.Element {
  const historyEventContextValue = useHistoryEventContext()
  function handleClick (): void {
    historyEventContextValue.rewind()
  }
  if (historyEventContextValue.previousState == null) {
    return (
      <LockIcon my='5px' />
    )
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
