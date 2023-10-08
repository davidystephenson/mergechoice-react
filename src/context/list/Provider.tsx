import { ReactNode, useState } from "react"
import { ListContextValue, State } from "../../types"
import listContext from "."
import chooseOption from "../../service/chooseOption"
import initializeState from "../../service/initializeState"
import getDefaultOptionIndex from "../../service/getDefaultOptionIndex"

export default function ListProvider({
  children
}: {
  children: ReactNode
}): JSX.Element {
  const [state, setState] = useState<State>(() => {
    const initialState = initializeState()
    return initialState
  })
  function applyChoice({ optionIndex }: {
    optionIndex: number
  }): void {
    setState(current => chooseOption({
      state: current, optionIndex
    }))
  }
  const defaultOptionIndex = getDefaultOptionIndex(state)
  const value: ListContextValue = {
    defaultOptionIndex,
    state,
    applyChoice
  }
  return (
    <listContext.Provider value={value}>
      {children}
    </listContext.Provider>
  )
}