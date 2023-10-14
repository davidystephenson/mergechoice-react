import { HStack, TableCellProps, TableRowProps } from '@chakra-ui/react'
import SingleRowView from './SingleRow'
import { ReactNode } from 'react'

export default function HeadingRowView ({ children, cellProps, ...restProps }: {
  cellProps?: TableCellProps
  children: ReactNode
} & TableRowProps): JSX.Element {
  return (
    <SingleRowView
      cellProps={{
        borderBottom: '1px solid lightgray',
        borderTop: '1px solid lightgray',
        ...cellProps
      }}
      {...restProps}
    >
      <HStack justifyContent='space-between'>
        {children}
      </HStack>
    </SingleRowView>
  )
}
