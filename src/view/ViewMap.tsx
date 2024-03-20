import { ComponentType, Key } from 'react'

export default function ViewMap <Element, Props> (props: {
  array: Element[]
  View: ComponentType<Props>
  map: (element: Element) => Props & { key: Key }
}): JSX.Element {
  const views = props.array.map((element) => {
    const viewProps = props.map(element)
    return (
      <props.View {...viewProps} key={viewProps.key} />
    )
  })
  return (
    <>
      {views}
    </>
  )
}
