import { Movie } from '../../types'
import { Episode } from '../mergeChoice/mergeChoiceTypes'
import isResult from './isResult'

export default function isEpisodeResult (props: {
  episode: Episode<Movie>
  query: string
}): boolean {
  if (props.query === '') {
    return true
  }
  if (props.episode.archive != null) {
    return isResult({ movie: props.episode.archive.item, query: props.query })
  }
  if (props.episode.choice != null) {
    const aResult = isResult({ movie: props.episode.choice.aItem, query: props.query })
    if (aResult) {
      return true
    }
    const bResult = isResult({ movie: props.episode.choice.bItem, query: props.query })
    if (bResult) {
      return true
    }
    return false
  }
  if (props.episode.import != null) {
    return props.episode.import.items.some(item => isResult({ movie: item, query: props.query }))
  }
  if (props.episode.remove != null) {
    return isResult({ movie: props.episode.remove.item, query: props.query })
  }
  if (props.episode.reset != null) {
    return isResult({ movie: props.episode.reset.item, query: props.query })
  }
  if (props.episode.unarchive != null) {
    return isResult({ movie: props.episode.unarchive.item, query: props.query })
  }
  const json = JSON.stringify(props.episode)
  const message = `Unexpected event: ${json}`
  throw new Error(message)
}
