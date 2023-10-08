import OptionView from "./Option"
import useListContext from "../context/list/use"

export default function DeferView (): JSX.Element {
  const listContextValue = useListContext()
  if (listContextValue.defaultOptionIndex == null) {
    return <></>
  }
  return (
    <OptionView optionIndex={listContextValue.defaultOptionIndex}>
      [D]efer:
    </OptionView>
  )
}