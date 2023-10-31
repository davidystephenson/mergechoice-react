import getItem from './getItem'
import { Item, Operation } from './types'

export default function labelOperation <ListItem extends Item> ({
  items,
  operation
}: {
  items: Record<string, ListItem>
  operation: Operation
}): Operation {
  const input1Names = operation.input[0].map(id => getItem({ id, items }).name)
  const input2Names = operation.input[1].map(id => getItem({ id, items }).name)
  const outputNames = operation.output.map(id => getItem({ id, items }).name)
  return {
    input: [input1Names, input2Names],
    output: outputNames
  }
}
