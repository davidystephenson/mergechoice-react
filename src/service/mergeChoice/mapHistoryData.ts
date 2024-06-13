import { HistoryDataKey, HistoryDataMapping, HistoryEvent, Item } from './mergeChoiceTypes'

export default function mapHistoryData <ListItem extends Item, Value, Result> (props: {
  data: HistoryDataMapping<ListItem, Value>
  event: HistoryEvent<ListItem>
  map: (props: { value: Value }) => Result
}): Result {
  let key: HistoryDataKey<ListItem>
  for (key in props.data) {
    const data = props.event[key]
    if (data != null) {
      const value = props.data[key]
      const result = props.map({ value })
      return result
    }
  }
  throw new Error('Unknown event type')
}
