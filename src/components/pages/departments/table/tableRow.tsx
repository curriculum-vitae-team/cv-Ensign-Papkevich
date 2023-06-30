import { memo } from "react"
import { useMutation } from "@apollo/client"
import { TableRow, TableCell, MenuItem } from "@mui/material"
import { IDepartment } from "../../../../interfaces/department.interface"
import { TableRowProps } from "../../../templates/table/table.types"
import { userIsAdmin } from "../../../../hooks/adminRoleHook"
import { SelectedDepartmentMenu } from "./selectedDepartmentMenu"
import { DELETE_DEPARTMENT_MUTATION } from "../../../../graphql/mutations/deleteDepartment"

const TableRowCells = ({ item }: TableRowProps<IDepartment>) => {
  const isAdmin = userIsAdmin()
  const [deleteDepartmentMutation] = useMutation<{ affected: number }>(
    DELETE_DEPARTMENT_MUTATION
  )

  const handleDeleteDepartment = async () => {
    await deleteDepartmentMutation({
      variables: { id: item.id },
      update(cache) {
        const id = cache.identify({ id: item.id, __typename: "Department" })
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
        <SelectedDepartmentMenu>
          <MenuItem disabled={!isAdmin} onClick={handleDeleteDepartment}>
            Delete Department
          </MenuItem>
        </SelectedDepartmentMenu>
      </TableCell>
    </TableRow>
  )
}

export default memo(TableRowCells)
