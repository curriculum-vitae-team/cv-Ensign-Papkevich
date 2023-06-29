import { TableCell, TableRow } from "@mui/material"
import { memo } from "react"
import { IUser } from "@interfaces/user.interface"
import { createSortLabel } from "@templates/table/components/sort-label"

const TableHeadCells = () => {
  return (
    <TableRow>
      <TableCell />
      <TableCell>
        {createSortLabel<IUser>("profile.first_name", "First Name")}
      </TableCell>
      <TableCell>
        {createSortLabel<IUser>("profile.last_name", "Last Name")}
      </TableCell>
      <TableCell>{createSortLabel<IUser>("email", "Email")}</TableCell>
      <TableCell>
        {createSortLabel<IUser>("department.name", "Department")}
      </TableCell>
      <TableCell>
        {createSortLabel<IUser>("position.name", "Position")}
      </TableCell>
      <TableCell />
      <TableCell />
      <TableCell />
    </TableRow>
  )
}

export default memo(TableHeadCells)
