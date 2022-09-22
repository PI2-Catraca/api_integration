import { Table, Thead, Tbody, Tr, Th, Td, chakra } from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import React from 'react'
import Modal from 'components/Modal'

function DataTable({ dataTable }) {
  /* eslint-disable */
  const data = React.useMemo(() => dataTable.usuarios || [], [])

  const columns = React.useMemo(
    () => [
      {
        Header: 'NOME',
        accessor: 'nome'
      },
      {
        Header: 'CPF',
        accessor: 'cpf'
      },
      {
        Header: 'DATA-Entrada',
        accessor: 'datein',
        Cell: (row) => {
          const d = new Date(row.row.original.datein)
          return <p>{d.toLocaleString()}</p>
        }
      },
      {
        Header: 'DATA-SAIDA',
        accessor: 'dateout',
        Cell: (row) => {
          const d = new Date(row.row.original.dateout)
          return <p>{d.toLocaleString()}</p>
        }
      },
      {
        Header: 'Action',
        accessor: 'action',
        Cell: (row) => <Modal data={row.row.original} />
      }
    ],
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy)

  return (
    <>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  key={index}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                >
                  {column.render('Header')}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row)
            return (
              <Tr key={index} {...row.getRowProps()}>
                {row.cells.map((cell, index) => (
                  <Td
                    key={index}
                    {...cell.getCellProps()}
                    isNumeric={cell.column.isNumeric}
                  >
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </>
  )
}

export default DataTable
