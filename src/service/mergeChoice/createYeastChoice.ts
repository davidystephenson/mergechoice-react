import yeast from 'yeast'
import { Choice, ChoiceData } from './merge-choice-types'

export default function createYeastChoice (props: ChoiceData): Choice {
  const id = yeast()
  const newChoice: Choice = {
    ...props,
    id
  }
  return newChoice
}
