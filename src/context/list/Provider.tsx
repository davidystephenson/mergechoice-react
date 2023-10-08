import { ReactNode, useState } from "react"
import { Item, ListContextValue, State } from "../../types"
import listContext from "."
import chooseOption from "../../service/chooseOption"
import getDefaultOptionIndex from "../../service/getDefaultOptionIndex"
import { STATE } from "../../constants"
import initializeState from "../../service/initializeState"

export default function ListProvider({
  children
}: {
  children: ReactNode
}): JSX.Element {
  const [state, setState] = useState<State>(STATE)
  function populate ({ items }: {
    items: Item[]
  }): void {
    const initialState = initializeState({ items })
    setState(initialState)
  }
  function applyChoice({ optionIndex }: {
    optionIndex: number
  }): void {
    setState(current => chooseOption({
      state: current, optionIndex
    }))
  }
  const defaultOptionIndex = getDefaultOptionIndex(state)
  const value: ListContextValue = {
    applyChoice,
    defaultOptionIndex,
    populate,
    state,
  }
  return (
    <listContext.Provider value={value}>
      {children}
    </listContext.Provider>
  )
}