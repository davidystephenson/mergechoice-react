import { Tr, Td, TableRowProps, TableCellProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function SingleRowView ({
  cellProps,
  children,
  ...restProps
}: {
  cellProps?: TableCellProps
  children?: ReactNode
} & TableRowProps): JSX.Element {
  return (
    <Tr {...restProps}>
      <Td colSpan={4} textAlign='center' {...cellProps}>
        {children}
      </Td>
    </Tr>
  )
}
