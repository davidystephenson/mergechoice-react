import { forwardRef } from 'react'
import MovieProvider from '../context/movie/MovieProvider'
import { Movie } from '../types'
import MovieRow from './MovieRow'
import { TableComponents, TableVirtuoso } from 'react-virtuoso'
import { Table, TableContainer, Tbody, Thead, Tr } from '@chakra-ui/react'

export default function MovieRows ({
  movies
}: {
  movies: Movie[]
}): JSX.Element {
  const Scroller: TableComponents['Scroller'] = forwardRef((props, ref) => {
    return <TableContainer {...props} whiteSpace='normal' ref={ref} />
  })
  const TableComponents: TableComponents<Movie> = {
    Scroller,
    Table: (props) => <Table {...props} size='sm' />,
    TableHead: Thead,
    TableRow: Tr,
    TableBody: forwardRef((props, ref) => <Tbody {...props} ref={ref} />)
  }
  return (
    <TableVirtuoso
      components={TableComponents}
      data={movies}
      useWindowScroll
      itemContent={(_, movie) => {
        // console.log('movie', movie)
        return (
          <MovieProvider movie={movie}>
            <MovieRow />
          </MovieProvider>
        )
      }}
    />
  )
}
