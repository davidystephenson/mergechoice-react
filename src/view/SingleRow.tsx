import { Td, TableCellProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function SingleRowView ({
  children,
  ...restProps
}: {
  children?: ReactNode
} & TableCellProps): JSX.Element {
  return (
    <>
      <Td colSpan={3} textAlign='center' {...restProps}>
        {children}
      </Td>
    </>
  )
}
