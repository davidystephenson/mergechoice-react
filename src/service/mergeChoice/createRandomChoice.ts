import asyncCreateYeastChoice from './asyncCreateYeastChoice'
import getShuffled from './getShuffled'
import { Item, State, ChoiceData, CreateChoice } from './merge-choice-types'

export default async function createRandomChoice <ListItem extends Item> (props: {
  createChoice?: CreateChoice
  state: State<ListItem>
}): Promise<State<ListItem>> {
  const createChoice = props.createChoice ?? asyncCreateYeastChoice
  const shuffledActiveIds = getShuffled(props.state.activeIds)
  const [first, second] = shuffledActiveIds
  const newChoiceData: ChoiceData = {
    options: [first, second],
    aIndex: 0,
    bIndex: 1,
    random: true
  }
  const newChoice = await createChoice(newChoiceData)
  return {
    ...props.state,
    choice: newChoice,
    finalized: false
  }
}
