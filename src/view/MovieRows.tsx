import { forwardRef } from 'react'
import MovieProvider from '../context/movie/MovieProvider'
import { TableItem } from '../types'
import MovieRow from './MovieRow'
import { TableComponents, TableVirtuoso } from 'react-virtuoso'
import { Table, TableContainer, Tbody, Thead, Tr } from '@chakra-ui/react'
import useTableItems from '../service/movies/useTableItems'

export default function MovieRows (): JSX.Element {
  const tableItems = useTableItems()
  const Scroller: TableComponents['Scroller'] = forwardRef((props, ref) => {
    return <TableContainer {...props} whiteSpace='normal' ref={ref} />
  })
  const TableComponents: TableComponents<TableItem> = {
    Scroller,
    Table: (props) => <Table {...props} size='sm' />,
    TableHead: Thead,
    TableRow: Tr,
    TableBody: forwardRef((props, ref) => <Tbody {...props} ref={ref} />)
  }
  return (
    <TableVirtuoso
      components={TableComponents}
      data={tableItems}
      useWindowScroll
      itemContent={(_, tableItem) => {
        if (tableItem.list != null) {
          return (
            <MovieProvider movie={tableItem.list.movie}>
              <MovieRow />
            </MovieProvider>
          )
        }
      }}
    />
  )
}
