import { PartKey, Part, State, Episode, Item } from './mergeChoiceTypes'
import restoreArchive from './restoreArchive'
import restoreChoice from './restoreChoice'
import restoreImport from './restoreImport'
import restoreRandom from './restoreRandom'
import restoreRemove from './restoreRemove'
import restoreReset from './restoreReset'
import restoreUnarchive from './restoreUnarchive'

type Input<T extends Item, K extends PartKey<T>> = NonNullable<Part<T>[K]>
type Actor<T extends Item, O, K extends PartKey<T>> = (props: {
  data: Input<T, K>
  state: State<T>
}) => O
type Actors<T extends Item, O> = {
  [K in PartKey<T>]: Actor<T, O, K>
}
type Director<T extends Item, O> = <K extends PartKey<T>>(props: {
  actor: Actor<T, O, K>
  input: Input<T, K>
}) => O
class AuditionError extends Error { }
const audition = <T extends Item, O, K extends PartKey<T>>(props: {
  actors: Actors<T, O>
  part: Part<T>
  director: Director<T, O>
  key: K
}): O => {
  const input = props.part[props.key]
  if (input == null) {
    throw new AuditionError()
  }
  const actor = props.actors[props.key]
  const output = props.director({ actor, input })
  return output
}
const marion = <T extends Item, O>(props: {
  actors: Actors<T, O>
  part: Part<T>
  director: Director<T, O>
}): O => {
  let key: PartKey<T>
  for (key in props.actors) {
    try {
      const result = audition({
        actors: props.actors,
        part: props.part,
        director: props.director,
        key
      })
      return result
    } catch (error) {
      if (error instanceof AuditionError) {
        continue
      }
      throw error
    }
  }
  throw new Error('No match found')
}

export function marionEpisode<ListItem extends Item, Output> (props: {
  actors: Actors<ListItem, Output>
  part: Episode<ListItem>
  director: Director<ListItem, Output>
}): Output {
  const output = marion({
    actors: props.actors,
    part: props.part,
    director: props.director
  })
  return output
}

export function marionEpisodeState<ListItem extends Item> (props: {
  actors: Actors<ListItem, State<ListItem>>
  part: Episode<ListItem>
  director: Director<ListItem, State<ListItem>>
}): State<ListItem> {
  const mapped = marion({
    actors: props.actors,
    part: props.part,
    director: props.director
  })
  return mapped
}

export default function restoreEpisodeState<ListItem extends Item> (restoreStateProps: {
  episode: Episode<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  const restoredState = marionEpisodeState({
    actors: {
      archive: restoreArchive,
      choice: restoreChoice,
      import: restoreImport,
      random: restoreRandom,
      remove: restoreRemove,
      reset: restoreReset,
      unarchive: restoreUnarchive
    },
    part: restoreStateProps.episode,
    director: ({ actor, input }): State<ListItem> => actor({ data: input, state: restoreStateProps.state })
  })
  return restoredState
}
