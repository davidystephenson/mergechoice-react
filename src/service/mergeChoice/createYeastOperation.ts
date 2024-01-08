import yeast from 'yeast'
import { Id, Input, Operation } from './merge-choice-types'

export default function createYeastOperation (props?: {
  input?: Input
  output?: Id[]
}): Operation {
  const input = props?.input ?? { first: [], second: [] }
  const output = props?.output ?? []
  return {
    id: yeast(),
    input,
    output
  }
}
