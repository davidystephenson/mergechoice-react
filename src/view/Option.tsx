import { Button, ButtonProps } from "@chakra-ui/react"
import findById from "../service/findById"
import { useContext } from "react"
import listContext from "../context/list"

export default function OptionView ({
  optionIndex,
  ...restProps
}: {
  optionIndex: number
} & ButtonProps): JSX.Element {
  const listContextValue = useContext(listContext)
  if (listContextValue == null) {
    throw new Error('listContextValue is null')
  }
  const itemId = listContextValue.state.choice.options[optionIndex]
  if (itemId == null || listContextValue.state.finalized) {
    return <></>
  }
  const item = findById({
    items: listContextValue.state.items, id: itemId
  })
  function handleClick(): void {
    if (listContextValue == null) {
      throw new Error('listContextValue is null')
    }
    listContextValue.applyChoice({
      optionIndex: listContextValue.state.choice.leftIndex
    })
  }
  return (
    <Button onClick={handleClick} {...restProps}>
      {item.label}
    </Button>
  )
}