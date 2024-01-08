import yeast from 'yeast'
import { Choice, ChoiceData } from './merge-choice-types'

export default async function asyncCreateYeastChoice (props: ChoiceData): Promise<Choice> {
  const id = yeast()
  const newChoice: Choice = {
    ...props,
    id
  }
  return newChoice
}
