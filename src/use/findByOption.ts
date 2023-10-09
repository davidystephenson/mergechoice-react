import useListContext from '../context/list/useListContext'
import findById from '../service/findById'
import { Movie } from '../types'

export default function useFindByOption ({ optionIndex }: {
  optionIndex: number
}): Movie | undefined {
  const listContextValue = useListContext()
  if (listContextValue.finalized) {
    return undefined
  }
  const itemId = listContextValue.choice.options[optionIndex]
  if (itemId == null) {
    return undefined
  }
  const item = findById({
    items: listContextValue.items, id: itemId
  })
  return item
}
