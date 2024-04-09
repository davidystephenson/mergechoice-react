import getRandom from './getRandom'
import { Item, Operation, State } from './mergeChoiceTypes'

export default function createOperation <ListItem extends Item> (props: {
  input?: [number[], number[]]
  output?: number[]
  state: State<ListItem>
}): Operation {
  const seed = `${props.state.seed}${props.state.operationCount}`
  const priority = getRandom({ seed })
  const operation = {
    input: props?.input ?? [[], []],
    mergeChoiceId: props.state.operationCount,
    output: props?.output ?? [],
    priority
  }
  props.state.operationCount += 1
  return operation
}
