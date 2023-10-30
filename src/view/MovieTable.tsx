import { forwardRef } from 'react'
import MovieProvider from '../context/movie/MovieProvider'
import { TableItem } from '../types'
import { TableComponents, TableVirtuoso } from 'react-virtuoso'
import { Table, TableContainer, Tbody, Thead, Tr } from '@chakra-ui/react'
import useTableItems from '../service/movies/useTableItems'
import MovieHeadingsRowView from './MovieHeadingsRow'
import MovieHeadingRowView from './MovieHeadingRowView'
import HistoryHeadingRowView from './HistoryHeadingRow'
import HistoryChoiceHeadingRowView from './HistoryChoiceHeadingRow'
import HistoryEventProvider from '../context/historyEvent/HistoryEventProvider'
import MovieListRow from './MovieListRow'
import HistoryChoiceARowView from './HistoryChoiceARow'
import HistoryChoiceBRowView from './HistoryChoiceBRow'
import HistoryImportHeadingView from './HistoryImportHeading'
import HistoryImportRowView from './HistoryImportRow'
import HistoryRemoveHeadingView from './HistoryRemoveHeading'
import HistoryRemoveRowView from './HistoryRemoveRow'

export default function MovieTableView (): JSX.Element {
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
            <MovieProvider movie={tableItem.list.movie} points={tableItem.list.movie.points}>
              <MovieListRow />
            </MovieProvider>
          )
        }
        if (tableItem.historyChoiceHeading != null) {
          return (
            <HistoryEventProvider historyEvent={tableItem.historyChoiceHeading.event}>
              <HistoryChoiceHeadingRowView />
            </HistoryEventProvider>
          )
        }
        if (tableItem.historyChoiceA != null) {
          return (
            <HistoryEventProvider historyEvent={tableItem.historyChoiceA.event}>
              <HistoryChoiceARowView />
            </HistoryEventProvider>
          )
        }
        if (tableItem.historyChoiceB != null) {
          return (
            <HistoryEventProvider historyEvent={tableItem.historyChoiceB.event}>
              <HistoryChoiceBRowView />
            </HistoryEventProvider>
          )
        }
        if (tableItem.historyImportHeading != null) {
          return (
            <HistoryEventProvider historyEvent={tableItem.historyImportHeading.event}>
              <HistoryImportHeadingView />
            </HistoryEventProvider>
          )
        }
        if (tableItem.historyImportMovie != null) {
          return (
            <HistoryEventProvider historyEvent={tableItem.historyImportMovie.event}>
              <MovieProvider movie={tableItem.historyImportMovie.movie}>
                <HistoryImportRowView />
              </MovieProvider>
            </HistoryEventProvider>
          )
        }
        if (tableItem.historyHeading === true) {
          return (
            <HistoryHeadingRowView />
          )
        }
        if (tableItem.historyRemoveHeading != null) {
          return (
            <HistoryEventProvider historyEvent={tableItem.historyRemoveHeading.event}>
              <HistoryRemoveHeadingView />
            </HistoryEventProvider>
          )
        }
        if (tableItem.historyRemoveMovie != null) {
          return (
            <HistoryEventProvider historyEvent={tableItem.historyRemoveMovie.event}>
              <MovieProvider
                movie={tableItem.historyRemoveMovie.movie}
                points={tableItem.historyRemoveMovie.movie.points}
              >
                <HistoryRemoveRowView />
              </MovieProvider>
            </HistoryEventProvider>
          )
        }
        if (tableItem.movieHeading === true) {
          return (
            <MovieHeadingRowView />
          )
        }
        if (tableItem.movieHeadings === true) {
          return (
            <MovieHeadingsRowView />
          )
        }
      }}
    />
  )
}
