import { memo } from "react"
import { useMutation } from "@apollo/client"
import { TableRow, TableCell, MenuItem } from "@mui/material"
import { IPosition } from "../../../../interfaces/position.interface"
import { TableRowProps } from "../../../templates/table/table.types"
import { userIsAdmin } from "../../../../hooks/adminRoleHook"
import { SelectedPositionMenu } from "./selectedPositionMenu"
import { DELETE_POSITION_MUTATION } from "../../../../graphql/mutations/deletePosition"

const TableRowCells = ({ item }: TableRowProps<IPosition>) => {
  const isAdmin = userIsAdmin()
  const [deletePositionMutation] = useMutation<{ affected: number }>(
    DELETE_POSITION_MUTATION
  )

  const handleDeletePosition = async () => {
    await deletePositionMutation({
      variables: { id: item.id },
      update(cache) {
        const id = cache.identify({ id: item.id, __typename: "Position" })
        cache.evict({ id })
        cache.gc()
      },
    })
  }

  return (
    <TableRow>
      <TableCell>{item.name}</TableCell>
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell>
        <SelectedPositionMenu>
          <MenuItem disabled={!isAdmin} onClick={handleDeletePosition}>
            Delete Position
          </MenuItem>
        </SelectedPositionMenu>
      </TableCell>
    </TableRow>
  )
}

export default memo(TableRowCells)
