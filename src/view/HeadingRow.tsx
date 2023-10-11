import { HStack, TableCellProps } from '@chakra-ui/react'
import SingleRowView from './SingleRow'
import { ReactNode } from 'react'

export default function HeadingRowView ({ children, cellProps }: {
  cellProps?: TableCellProps
  children: ReactNode
}): JSX.Element {
  return (
    <SingleRowView
      cellProps={{
        borderBottom: '1px solid lightgray',
        borderTop: '1px solid lightgray',
        ...cellProps
      }}
    >
      <HStack justifyContent='space-between'>
        {children}
      </HStack>
    </SingleRowView>
  )
}
