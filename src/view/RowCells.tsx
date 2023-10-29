import { Td, TableCellProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function RowCellView ({
  children,
  ...restProps
}: {
  children?: ReactNode
} & TableCellProps): JSX.Element {
  return (
    <>
      <Td colSpan={4} textAlign='center' {...restProps}>
        {children}
      </Td>
    </>
  )
}
