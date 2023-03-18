import { FC, memo, useDeferredValue, useMemo, useState } from "react"
import {
  Table as MuiTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Button,
} from "@mui/material"
import { Item, TableProps } from "./table.types"
import { SortingOrder } from "../../../constants/tableSort.constant"
import { sortTableItems, searchItems } from "./helpers/helpers"
import { TableSearchContext, TableSortContext } from "./table.context"
import { userIsAdmin } from "../../../hooks/adminRoleHook"

const Table = <T extends Item>({
  items,
  loading,
  TableSearch,
  TableHeadCells,
  TableRowCells,
  searchBy,
  defaultSortBy,
  additionalBtnName,
  additionalBtnAction,
}: TableProps<T>) => {
  const [search, setSearch] = useState("")
  const deferredSearch = useDeferredValue(search)

  const tableSearch = useMemo(() => {
    return { search, setSearch }
  }, [search])

  const filteredItems = useMemo(() => {
    return items.filter(searchItems(searchBy, deferredSearch))
  }, [items, deferredSearch])

  const [sortBy, setSortBy] = useState(defaultSortBy)
  const deferredSortBy = useDeferredValue(sortBy)

  const [order, setOrder] = useState(SortingOrder.Asc)
  const deferredOrder = useDeferredValue(order)

  const tableSort = useMemo(() => {
    return { sortBy, order, setSortBy, setOrder }
  }, [sortBy, order])

  const sortedItems = useMemo(() => {
    return filteredItems.sort(sortTableItems<T>(deferredSortBy, deferredOrder))
  }, [filteredItems, deferredSortBy, deferredOrder])

  const isAdmin = userIsAdmin()

  return (
    <MuiTable stickyHeader>
      <TableHead>
        <TableSearchContext.Provider value={tableSearch as never}>
          <TableRow>
            <TableCell
              colSpan={5}
              sx={{
                top: 64,
                height: 80,
                backgroundColor: "#FFFFF",
                borderBottom: "none",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <TableSearch />
              </Box>
            </TableCell>

            <TableCell
              sx={{
                top: 64,
                height: 80,
                backgroundColor: "#FFFFF",
                borderBottom: "none",
              }}
            >
              <Button
                variant="outlined"
                color="secondary"
                disabled={!isAdmin}
                onClick={additionalBtnAction}
              >
                {additionalBtnName}
              </Button>
            </TableCell>
          </TableRow>
        </TableSearchContext.Provider>
        <TableSortContext.Provider value={tableSort as never}>
          <TableHeadCells />
        </TableSortContext.Provider>
      </TableHead>
      <TableBody>
        {loading && (
          <TableRow>
            <TableCell colSpan={10}>loading</TableCell>
          </TableRow>
        )}
        {sortedItems.map((item) => (
          <TableRowCells key={item.id} item={item} />
        ))}
      </TableBody>
    </MuiTable>
  )
}

const TableComponent = memo(Table) as never

export const createTable = <T extends Item>(): FC<TableProps<T>> =>
  TableComponent
