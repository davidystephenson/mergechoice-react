import { ReactNode, useState } from "react"
import { Item, ListContextValue, State } from "../../types"
import listContext from "."
import range from "../../service/range"
import getShuffled from "../../service/getShuffled"
import getOperations from "../../service/getOperations"
import createChoice from "../../service/createChoice"
import chooseOption from "../../service/chooseOption"

export default function ListProvider({
  children
}: {
  children: ReactNode
}): JSX.Element {
  const [state, setState] = useState<State>(() => {
    const nitems = 5
    const labels = [
      'Schindler\'s List',
      'The Silence of the Lambs',
      'Back to the Future',
      'Amadeus',
      'Raiders of the Lost Ark',
      'The Shawshank Redemption',
      'Forrest Gump',
      'The Lion King',
      'Saving Private Ryan',
      'Gladiator',
      'Memento',
      'Fight Club',
      'The Matrix',
      'The Prestige',
      'The Departed',
      'Inception',
      'Django Unchained',
      'The Godfather',
      'Alien'
    ]

    const shuffledLabels = getShuffled(labels).slice(0, nitems)

    const initialState: State = {
      items: [],
      operations: [],
      choice: {
        options: [],
        currentOperationIndex: 0,
        leftIndex: 0,
        rightIndex: 1
      },
      finalized: false
    }
    initialState.items = range(nitems).map(i => {
      const item: Item = {
        id: String(Math.random()),
        label: shuffledLabels[i],
        points: 0
      }
      return item
    })
    initialState.operations = initialState.items.map(item => ({
      input: [[], []],
      output: [item.id],
      steps: 0
    }))
    initialState.operations = getOperations(initialState)
    initialState.choice = createChoice(initialState)
    return initialState
  })
  function applyChoice({ optionIndex: optionIndex }: {
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