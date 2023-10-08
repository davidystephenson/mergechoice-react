import { useContext } from "react"
import listContext from "../context/list"
import OptionView from "./Option"

export default function DeferView (): JSX.Element {
  const listContextValue = useContext(listContext)
  if (listContextValue == null) {
    throw new Error('listContextValue is null')
  }
  if (listContextValue.defaultOptionIndex == null) {
    return <></>
  }
  return (
    <OptionView optionIndex={listContextValue.defaultOptionIndex}>
      Defer
    </OptionView>
  )
}