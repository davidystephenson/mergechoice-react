import yeast from 'yeast'
import { Choice, ChoiceData } from './merge-choice-types'

export default function createChoice (props: ChoiceData): Choice {
  const mergeChoiceId = yeast()
  const newChoice: Choice = {
    ...props,
    mergeChoiceId
  }
  return newChoice
}
