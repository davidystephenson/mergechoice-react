import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import useHistoryContext from '../context/history/useHistoryContext'

export default function HistoryButtonView (): JSX.Element {
  const historyContextValue = useHistoryContext()
  const buttonProps = {
    onClick: historyContextValue.toggleExpanded,
    size: 'xs'
  }
  if (historyContextValue.isSingle) {
    return <></>
  }
  if (historyContextValue.expanded) {
    return <IconButton aria-label='Collapse table' icon={<TriangleDownIcon />} {...buttonProps} />
  }
  return <IconButton aria-label='Expand table' icon={<TriangleUpIcon transform='rotate(90deg)' />} {...buttonProps} />
}
