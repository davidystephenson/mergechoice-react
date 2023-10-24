import { Movie, Operation } from '../types'
import findById from './findById'

export default function logOperations ({ items, operations }: {
  items: Movie[]
  operations: Operation[]
}): void {
  operations.forEach(operation => {
    const firstLabels = operation.input[0].map(id => {
      const item = findById({ items, id })
      return item.title
    })
    console.log('first input items', firstLabels)
    const secondLabels = operation.input[1].map(id => {
      const item = findById({ items, id })
      return item.title
    })
    console.log('second input items', secondLabels)
    const outputLabels = operation.output.map(id => {
      const item = findById({ items, id })
      return item.title
    })
    console.log('output items', outputLabels)
  })
}
