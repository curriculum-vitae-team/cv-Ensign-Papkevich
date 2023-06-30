import { TableCell, TableRow } from "@mui/material"
import { createSortLabel } from "@templates/table/components/sort-label"
import { ILanguage } from "@interfaces/language.interface"

const TableHeadCells = () => {
  return (
    <TableRow>
      <TableCell>{createSortLabel<ILanguage>("name", "Name")}</TableCell>
      <TableCell>
        {createSortLabel<ILanguage>("native_name", "Native name")}
      </TableCell>
      <TableCell>{createSortLabel<ILanguage>("iso2", "ISO 2")}</TableCell>
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
    </TableRow>
  )
}

export default TableHeadCells
