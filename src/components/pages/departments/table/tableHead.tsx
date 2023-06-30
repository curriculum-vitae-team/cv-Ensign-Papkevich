import { TableCell, TableRow } from "@mui/material"
import { createSortLabel } from "@templates/table/components/sort-label"
import { IDepartment } from "@interfaces/department.interface"

const TableHeadCells = () => {
  return (
    <TableRow>
      <TableCell>{createSortLabel<IDepartment>("name", "Name")}</TableCell>
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
    </TableRow>
  )
}

export default TableHeadCells
