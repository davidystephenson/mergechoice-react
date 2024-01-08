import getItem from './getItem'
import { Item, Operation } from './merge-choice-types'

export default function labelOperation <ListItem extends Item> (props: {
  items: Record<string, ListItem>
  operation: Operation
}): Operation {
  const input1Names = props.operation.input.first.map(id => getItem({ id, items: props.items }).name)
  const input2Names = props.operation.input.second.map(id => getItem({ id, items: props.items }).name)
  const outputNames = props.operation.output.map(id => getItem({ id, items: props.items }).name)
  return {
    id: props.operation.id,
    input: {
      first: input1Names,
      second: input2Names
    },
    output: outputNames
  }
}
