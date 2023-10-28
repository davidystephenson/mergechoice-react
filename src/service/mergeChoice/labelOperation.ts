import findById from './findById'
import { Item, Operation } from './types'

export default function labelOperation <ListItem extends Item> ({
  items,
  operation
}: {
  items: ListItem[]
  operation: Operation
}): Operation {
  const input1Items = operation.input[0].map(id => findById({
    id, items
  }))
  const input1Names = input1Items.map(item => item.name)
  const input2Items = operation.input[1].map(id => findById({
    id, items
  }))
  const input2Names = input2Items.map(item => item.name)
  const outputNames = operation.output.map(id => findById({
    id, items
  }).name)
  return {
    input: [input1Names, input2Names],
    output: outputNames
  }
}
