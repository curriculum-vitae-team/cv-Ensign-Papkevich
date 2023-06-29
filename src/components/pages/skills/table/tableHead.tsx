import { TableCell, TableRow } from "@mui/material"
import { createSortLabel } from "@templates/table/components/sort-label"
import { ISkill } from "@interfaces/skill.interface"

const TableHeadCells = () => {
  return (
    <TableRow>
      <TableCell>{createSortLabel<ISkill>("name", "Name")}</TableCell>
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
