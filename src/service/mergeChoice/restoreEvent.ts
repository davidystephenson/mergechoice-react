import { HistoryEvent, State, Item, HistoryDataKey, HistoryDataTeam, HistoryDataProblem, HistoryDataStrategy } from './mergeChoiceTypes'
import restoreArchive from './restoreArchive'
import restoreChoice from './restoreChoice'
import restoreImport from './restoreImport'
import restoreRandom from './restoreRandom'
import restoreRemove from './restoreRemove'
import restoreReset from './restoreReset'
import restoreUnarchive from './restoreUnarchive'

function strategist<
  ListItem extends Item,
  Output,
  Key extends HistoryDataKey<ListItem>
> (props: HistoryDataProblem<ListItem, Output, Key>): HistoryDataStrategy<ListItem, Output, Key> | undefined {
  const hearsay = props.team.delivery[props.key]
  if (hearsay == null) {
    return undefined
  }
  const actor = props.team.actors[props.key]
  const strategy: HistoryDataStrategy<ListItem, Output, Key> = {
    actor,
    hearsay
  }
  return strategy
}
function marion<
  ListItem extends Item, Output
> (props: HistoryDataTeam<ListItem, Output>): Output {
  let key: HistoryDataKey<ListItem>
  for (key in props.actors) {
    const problem = {
      key,
      team: props
    }
    const strategy = strategist(problem)
    if (strategy == null) {
      continue
    }
    const output = props.director(strategy)
    return output
  }
  throw new Error('Unknown event type')
}

export default function restoreEvent<ListItem extends Item> (props: {
  event: HistoryEvent<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  const output = marion({
    actors: {
      archive: restoreArchive,
      choice: restoreChoice,
      import: restoreImport,
      random: restoreRandom,
      remove: restoreRemove,
      reset: restoreReset,
      unarchive: restoreUnarchive
    },
    delivery: props.event,
    director: (directorProps) => {
      return directorProps.actor({
        data: directorProps.hearsay,
        state: props.state
      })
    }
  })
  return output
}
