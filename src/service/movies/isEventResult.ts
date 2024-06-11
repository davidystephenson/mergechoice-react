import { Movie } from '../../types'
import { HistoryEvent } from '../mergeChoice/mergeChoiceTypes'
import isResult from './isResult'

export default function isEventResult (props: {
  event: HistoryEvent<Movie>
  query: string
}): boolean {
  if (props.query === '') {
    return true
  }
  if (props.event.archive != null) {
    return isResult({ movie: props.event.archive.item, query: props.query })
  }
  if (props.event.choice != null) {
    const aResult = isResult({ movie: props.event.choice.aItem, query: props.query })
    if (aResult) {
      return true
    }
    const bResult = isResult({ movie: props.event.choice.bItem, query: props.query })
    if (bResult) {
      return true
    }
    return false
  }
  if (props.event.import != null) {
    return props.event.import.items.some(item => isResult({ movie: item, query: props.query }))
  }
  if (props.event.remove != null) {
    return isResult({ movie: props.event.remove.item, query: props.query })
  }
  if (props.event.reset != null) {
    return isResult({ movie: props.event.reset.item, query: props.query })
  }
  if (props.event.unarchive != null) {
    return isResult({ movie: props.event.unarchive.item, query: props.query })
  }
  const json = JSON.stringify(event)
  const message = `Unexpected event: ${json}`
  throw new Error(message)
}
