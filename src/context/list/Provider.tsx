import { ReactNode, useState } from "react"
import { ListContextValue, State } from "../../types"
import listContext from "."
import chooseOption from "../../service/chooseOption"
import initializeState from "../../service/initializeState"

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
  const value: ListContextValue = {
    state,
    applyChoice
  }
  return (
    <listContext.Provider value={value}>
      {children}
    </listContext.Provider>
  )
}