import { TableCellProps } from '@chakra-ui/react'
import HeadingRowView from './HeadingRow'
import { ReactNode } from 'react'

export default function HistoryEventHeadingRowView ({
  children,
  ...restProps
}: {
  children: ReactNode
} & TableCellProps): JSX.Element {
  return (
    <HeadingRowView
      borderBottom='1px solid lightgray'
      paddingTop={0}
      paddingBottom={0}
      {...restProps}
    >
      {children}
    </HeadingRowView>
  )
}
