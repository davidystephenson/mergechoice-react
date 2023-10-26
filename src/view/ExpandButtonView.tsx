import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { ButtonProps, IconButton } from '@chakra-ui/react'

export default function ExpandButtonView ({ open, ...restProps }: {
  open: boolean
} & ButtonProps): JSX.Element {
  const buttonProps = {
    size: 'xs'
  }
  if (open) {
    return <IconButton aria-label='Collapse table' icon={<TriangleDownIcon />} {...buttonProps} {...restProps} />
  }
  return <IconButton aria-label='Expand table' icon={<TriangleUpIcon transform='rotate(90deg)' />} {...buttonProps} {...restProps} />
}
