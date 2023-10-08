import { Stack } from '@chakra-ui/react'
import useListContext from '../context/list/useListContext'

export default function ReviewView (): JSX.Element {
  const listContextValue = useListContext()
  if (listContextValue.review == null) {
    return <></>
  }
  return (
    <Stack direction='row' />
  )
}
