import { Movie } from '../../types'
import { HistoryEvent } from '../mergeChoice/mergeChoiceTypes'
import isResult from './isResult'

export default function isEventResult ({
  event,
  query
}: {
  event: HistoryEvent<Movie>
  query: string
}): boolean {
  if (query === '') {
    return true
  }
  if (event.choice != null) {
    const aResult = isResult({ movie: event.choice.aItem, query })
    if (aResult) {
      return true
    }
    const bResult = isResult({ movie: event.choice.bItem, query })
    if (bResult) {
      return true
    }
    return false
  }
  if (event.import != null) {
    return event.import.items.some(item => isResult({ movie: item, query }))
  }
  if (event.remove != null) {
    return isResult({ movie: event.remove.item, query })
  }
  const json = JSON.stringify(event)
  const message = `Unexpected event: ${json}`
  throw new Error(message)
}
