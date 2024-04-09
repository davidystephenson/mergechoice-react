import { OperationDictionary } from './mergeChoiceTypes'

export default function getnumbersFromOperations (props: {
  operations: OperationDictionary
}): number[] {
  const values = Object.values(props.operations)
  const itemIds = values.reduce<number[]>((itemIds, operation) => {
    operation.input.forEach(input => {
      itemIds.push(...input)
    })
    itemIds.push(...operation.output)
    return itemIds
  }, [])
  return itemIds
}
