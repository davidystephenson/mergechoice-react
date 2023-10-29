import { HStack, TableCellProps } from '@chakra-ui/react'
import SingleRowView from './SingleRow'
import { ReactNode } from 'react'

export default function HeadingRowView ({ children, ...restProps }: {
  children: ReactNode
} & TableCellProps): JSX.Element {
  return (
    <SingleRowView
      borderBottom='1px solid lightgray'
      borderTop='1px solid lightgray'
      {...restProps}
    >
      <HStack justifyContent='space-between'>
        {children}
      </HStack>
    </SingleRowView>
  )
}
