import { TableRow, TableCell, Avatar, MenuItem } from "@mui/material"
import { IUser } from "../../../../interfaces/user.interface"
import { TableRowProps } from "../../../templates/table/table.types"
import { useNavigate } from "react-router-dom"
import { userIsAdmin } from "../../../../hooks/adminRoleHook"
import { memo } from "react"
import { SelectedUserMenu } from "./selectedUserMenu"
import { useMutation } from "@apollo/client"
import { DELETE_USER_MUTATION } from "../../../../graphql/mutations/deleteUser"

const TableRowCells = ({ item }: TableRowProps<IUser>) => {
  const navigate = useNavigate()
  const navigateToUserProfile = () => {
    navigate(`/employees/${item.id}/profile`)
  }

  const isAdmin = userIsAdmin()
  const [deleteUserMutation] = useMutation<{ affected: number }>(
    DELETE_USER_MUTATION
  )

  const handleDeleteUser = async () => {
    await deleteUserMutation({
      variables: { id: item.id },
      update(cache) {
        const id = cache.identify({ id: item.id, __typename: "User" })
        cache.evict({ id })
        cache.gc()
      },
    })
  }

  return (
    <TableRow>
      <TableCell>
        <Avatar src={item.profile.avatar}>
          {item.profile.full_name?.[0] || item.email[0]}
        </Avatar>
      </TableCell>
      <TableCell>{item.profile.first_name}</TableCell>
      <TableCell>{item.profile.last_name}</TableCell>
      <TableCell>{item.email}</TableCell>
      <TableCell>{item.department_name}</TableCell>
      <TableCell>{item.position_name}</TableCell>
      <TableCell>
        <SelectedUserMenu>
          <MenuItem onClick={navigateToUserProfile}>Profile</MenuItem>
          <MenuItem disabled={!isAdmin} onClick={handleDeleteUser}>
            Delete User
          </MenuItem>
        </SelectedUserMenu>
      </TableCell>
    </TableRow>
  )
}

export default memo(TableRowCells)
