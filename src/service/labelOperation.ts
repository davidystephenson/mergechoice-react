import { Movie, Operation } from '../types'
import findById from './findById'

export default function labelOperation ({
  items,
  operation
}: {
  items: Movie[]
  operation: Operation
}): Operation {
  const input1Items = operation.input[0].map(id => findById({
    id, items
  }))
  const input1Titles = input1Items.map(item => item.title)
  const input2Items = operation.input[1].map(id => findById({
    id, items
  }))
  const input2Titles = input2Items.map(item => item.title)
  const outputTitles = operation.output.map(id => findById({
    id, items
  }).title)
  return {
    input: [input1Titles, input2Titles],
    output: outputTitles
  }
}
