import { Item, Operation } from "../types"
import findById from "./findById"

export default function logOperations({ items, operations }: {
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