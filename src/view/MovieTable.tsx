import { forwardRef } from 'react'
import { TableItem } from '../types'
import { TableComponents, TableVirtuoso } from 'react-virtuoso'
import { Table, TableContainer, Tbody, Thead, Tr } from '@chakra-ui/react'
import useTableItems from '../service/movies/useTableItems'
import TableItemView from './TableItem'
import TableItemProvider from '../context/tableItem/TableItemProvider'
import SearchView from './Search'

export default function MovieTableView (): JSX.Element {
  const tableItems = useTableItems()
  console.log('tableItems', tableItems)
  const Scroller: TableComponents['Scroller'] = forwardRef((props, ref) => {
    return <TableContainer {...props} whiteSpace='normal' overflowX='clip' overflowY='clip' ref={ref} />
  })
  const TableComponents: TableComponents<TableItem> = {
    Scroller,
    Table: (props) => <Table {...props} size='sm' />,
    TableBody: forwardRef((props, ref) => <Tbody {...props} ref={ref} />),
    TableHead: Thead,
    TableRow: Tr
  }
  return (
    <TableVirtuoso
      components={TableComponents}
      fixedHeaderContent={SearchView}
      data={tableItems}
      useWindowScroll
      itemContent={(_, tableItem) => {
        return (
          <TableItemProvider tableItem={tableItem}>
            <TableItemView />
          </TableItemProvider>
        )
      }}
    />
  )
}
