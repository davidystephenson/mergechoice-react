import yeast from 'yeast'
import { Id, Operation } from './merge-choice-types'

export default function createYeastOperation (props?: {
  input?: [Id[], Id[]]
  output?: Id[]
}): Operation {
  return {
    id: yeast(),
    input: props?.input ?? [[], []],
    output: props?.output ?? []
  }
}
