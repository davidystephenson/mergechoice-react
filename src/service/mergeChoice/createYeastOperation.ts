import yeast from 'yeast'
import { ItemId, Operation } from './merge-choice-types'

export default function createYeastOperation (props?: {
  input?: [ItemId[], ItemId[]]
  output?: ItemId[]
}): Operation {
  return {
    mergeChoiceId: yeast(),
    input: props?.input ?? [[], []],
    output: props?.output ?? []
  }
}
