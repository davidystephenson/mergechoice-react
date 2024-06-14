import { HistoryDataKey, HistoryDataMapper, HistoryDataMappers, HistoryEvent, Item } from './mergeChoiceTypes'

function matchMapper<ListItem extends Item, Key extends HistoryDataKey<ListItem>, Result> (props: {
  event: HistoryEvent<ListItem>
  mappers: HistoryDataMappers<ListItem, Result>
  key: Key
}): {
    mapper: HistoryDataMapper<ListItem, Key, Result>
    data: NonNullable<HistoryEvent<ListItem>[Key]>
  } | undefined {
  const mapper = props.mappers[props.key]
  const data = props.event[props.key]
  if (data == null) {
    return undefined
  }
  return { mapper, data }
}

export default function mapHistoryData<ListItem extends Item, Result> (props: {
  mapping: HistoryDataMappers<ListItem, Result>
  event: HistoryEvent<ListItem>
}): Result {
  let mappingKey: HistoryDataKey<ListItem>
  for (mappingKey in props.mapping) {
    const match = matchMapper({ event: props.event, mappers: props.mapping, key: mappingKey })
    if (match == null) {
      continue
    }
    const result = match.mapper({ data: match.data, key: mappingKey })
    return result
  }
  throw new Error('Unknown event type')
}
