import { useState } from 'react'
import { Choice, Item, Operation, State } from './types'
import { Button, Container, HStack, Table, Tbody, Td, Tr } from '@chakra-ui/react'

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

function range(n: number): number[] {
  return [...Array(n).keys()]
}
function getShuffled<Element>(array: Element[]): Element[] {
  const indices = range(array.length)
  const randoms = indices.map(() => Math.random())
  indices.sort((i, j) => randoms[i] - randoms[j])
  return indices.map(i => array[i])
}
function getRandom<Element>(array: Element[]): Element {
  return array[Math.floor(Math.random() * array.length)]
}
function findById({ id, items }: {
  id: string
  items: Item[]
}): Item {
  const found = items.find(item => item.id === id)
  if (found == null) {
    throw new Error(`id ${id} not found in items`)
  }
  return found
}
function findLabelById({ id, items }: {
  id: string
  items: Item[]
}): string {
  return findById({ items, id }).label
}
function clone<Serializable>(x: Serializable): Serializable {
  return JSON.parse(JSON.stringify(x))
}
function cloneLog<Serializable>(label: string, x: Serializable): void {
  const cloned = clone(x)
  console.log(label, cloned)
}
function logOperations({ items, operations }: {
  items: Item[]
  operations: Operation[]
}): void {
  operations.forEach(operation => {
    console.log(`operation steps: ${operation.steps}`)
    const firstLabels = operation.input[0].map(id => {
      const item = findById({ items, id })
      return item.label
    })
    console.log('first input items', firstLabels)
    const secondLabels = operation.input[1].map(id => {
      const item = findById({ items, id })
      return item.label
    })
    console.log('second input items', secondLabels)
    const outputLabels = operation.output.map(id => {
      const item = findById({ items, id })
      return item.label
    })
    console.log('output items', outputLabels)
  })
}

function logChoice({ choice, items }: {
  choice: Choice
  items: Item[]
}): void {
  const choiceLabels = choice.options.map(id => {
    return findLabelById({ items, id })
  })
  console.log('choice items', choiceLabels)
}

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
function getOperations({ operations }: {
  operations: Operation[]
}): Operation[] {
  const blocks = operations.map(operation => operation.output)
  const newOperations: Operation[] = []
  const pairs = Math.floor(blocks.length / 2)
  range(pairs).forEach(() => {
    const blockA = blocks.pop()
    if (blockA == null) {
      throw new Error('blockA is null')
    }
    const blockB = blocks.pop()
    if (blockB == null) {
      throw new Error('blockB is null')
    }
    newOperations.unshift({
      input: [blockA, blockB],
      output: [],
      steps: blockA.length + blockB.length - 1
    })
  })
  if (blocks.length === 1) {
    const output = blocks.pop()
    if (output == null) {
      throw new Error('output is null')
    }
    newOperations.push({
      input: [[], []],
      output,
      steps: 0
    })
  }
  return newOperations
}
initialState.operations = getOperations(initialState)

function getOperationIndex({
  operations
}: {
  operations: Operation[]
}): number {
  const maxSteps = Math.max(...operations.map(operation => operation.steps))
  const indices = range(operations.length)
  const maximalIndices = indices.filter(index => operations[index].steps === maxSteps)
  return getRandom(maximalIndices)
}
function createChoice({ operations, items }: {
  operations: Operation[]
  items: Item[]
}): Choice {
  logOperations({ items, operations })
  const newChoice: Choice = {
    options: [],
    currentOperationIndex: 0,
    leftIndex: 0,
    rightIndex: 1
  }
  newChoice.currentOperationIndex = getOperationIndex({ operations })
  const currentOperation = operations[newChoice.currentOperationIndex]
  newChoice.options[0] = currentOperation.input[0][0]
  newChoice.options[1] = currentOperation.input[1][0]
  newChoice.leftIndex = getRandom([0, 1])
  newChoice.rightIndex = 1 - newChoice.leftIndex
  logChoice({ choice: newChoice, items })
  return newChoice
}
initialState.choice = createChoice(initialState)

function chooseOption({
  state: {
    items,
    operations,
    choice
  },
  choiceIndex
}: {
  state: State
  choiceIndex: number
}): State {
  const newItems = clone(items)
  const newOperations = clone(operations)
  cloneLog('newOperations', newOperations)
  if (choice == null) {
    throw new Error('choice is null')
  }
  const currentOperation = newOperations[choice.currentOperationIndex]
  cloneLog('currentOperation', currentOperation)
  const chosenId = currentOperation.input[choiceIndex].shift()
  console.log('chosenId', chosenId)
  if (chosenId == null) {
    throw new Error('chosenId is null')
  }
  currentOperation.output.push(chosenId)
  const chosenItem = findById({ items: newItems, id: chosenId })
  console.log('chosenItem', chosenItem)
  chosenItem.points = currentOperation.steps
  currentOperation.steps -= 1
  if (currentOperation.input[choiceIndex].length === 0) {
    currentOperation.output.push(...currentOperation.input[1 - choiceIndex])
    currentOperation.input[1 - choiceIndex] = []
    currentOperation.steps = 0
  }
  newItems.sort((a, b) => b.points - a.points)
  const maxSteps = Math.max(...newOperations.map(operation => operation.steps))
  if (maxSteps > 0) {
    const newChoice = createChoice({
      operations: newOperations, items: newItems
    })
    return {
      items: newItems,
      operations: newOperations,
      choice: newChoice,
      finalized: false
    }
  } else {
    const nextOperations = getOperations({ operations: newOperations })
    const maxSteps = Math.max(...nextOperations.map(operation => operation.steps))
    if (maxSteps > 0) {
      const nextChoice = createChoice({
        operations: nextOperations,
        items: newItems
      })
      return {
        items: newItems,
        operations: nextOperations,
        choice: nextChoice,
        finalized: false
      }
    } else {
      return {
        items: newItems,
        operations: nextOperations,
        choice,
        finalized: true
      }
    }
  }
}
function App() {
  const [state, setState] = useState<State>(initialState)
  console.log('render state', state)
  function handleLeft(): void {
    const leftOption = state.choice.options[state.choice.leftIndex]
    const leftItem = findById({ items: state.items, id: leftOption })
    const rightOption = state.choice.options[state.choice.rightIndex]
    const rightItem = findById({ items: state.items, id: rightOption })
    console.log(`${leftItem.label} > ${rightItem.label}`)
    setState(current => chooseOption({
      state: current, choiceIndex: current.choice.leftIndex
    }))
  }
  function handleRight(): void {
    const leftOption = state.choice.options[state.choice.leftIndex]
    const leftItem = findById({ items: state.items, id: leftOption })
    const rightOption = state.choice.options[state.choice.rightIndex]
    const rightItem = findById({ items: state.items, id: rightOption })
    console.log(`${rightItem.label} > ${leftItem.label}`)
    setState(current => chooseOption({
      state: current, choiceIndex: current.choice.rightIndex
    }))
  }
  const leftId = state.choice.options[state.choice.leftIndex]
  const leftItem = leftId == null ? null : findById({
    items: state.items, id: leftId
  })
  const rightId = state.choice.options[state.choice.rightIndex]
  const rightItem = rightId == null ? null : findById({
    items: state.items, id: rightId
  })
  const leftItemview = leftItem != null && (
    <Button onClick={handleLeft}>{leftItem.label}</Button>
  )
  const rightItemview = rightItem != null && (
    <Button onClick={handleRight}>{rightItem.label}</Button>
  )
  const itemViews = state.items.map(item => {
    const { id, label, points } = item
    return (
      <Tr key={id}>
        <Td>{label}</Td>
        <Td>{points}</Td>
      </Tr>
    )
  })
  if (state.finalized) {
    console.log('finalized', state)
  }
  return (
    <Container>
      <HStack>
        {leftItemview}
        {rightItemview}
      </HStack>
      <Table>
        <Tbody>
          {itemViews}
        </Tbody>
      </Table>
    </Container>
  )
}

export default App
