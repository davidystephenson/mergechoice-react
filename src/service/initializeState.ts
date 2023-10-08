import { State, Item } from "../types"
import createChoice from "./createChoice"
import getOperations from "./getOperations"
import getShuffled from "./getShuffled"
import range from "./range"

export default function initializeState(): State { 
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
}