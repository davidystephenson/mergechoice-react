import useListContext from "../context/list/useListContext"
import findById from "../service/findById"
import { Item } from "../types"

export default function useFindByOption ({ optionIndex }: {
  optionIndex: number
}): Item | undefined {
  const listContextValue = useListContext()
  if (listContextValue.state.finalized) {
    return undefined
  }
  const itemId = listContextValue.state.choice.options[optionIndex]
  if (itemId == null) {
    return undefined
  }
  const item = findById({
    items: listContextValue.state.items, id: itemId
  })
  return item
}