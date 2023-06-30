import { memo } from "react"
import { useMutation } from "@apollo/client"
import { TableRow, TableCell, MenuItem } from "@mui/material"
import { ISkill } from "../../../../interfaces/skill.interface"
import { TableRowProps } from "../../../templates/table/table.types"
import { userIsAdmin } from "../../../../hooks/adminRoleHook"
import { SelectedSkillMenu } from "./selectedSkillMenu"
import { DELETE_SKILL_MUTATION } from "../../../../graphql/mutations/deleteSkill"

const TableRowCells = ({ item }: TableRowProps<ISkill>) => {
  const isAdmin = userIsAdmin()
  const [deleteSkillMutation] = useMutation<{ affected: number }>(
    DELETE_SKILL_MUTATION
  )

  const handleDeleteSkill = async () => {
    console.log("deleted")
    await deleteSkillMutation({
      variables: { id: item.id },
      update(cache) {
        const id = cache.identify({ id: item.id, __typename: "Skill" })
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
        <SelectedSkillMenu>
          <MenuItem disabled={!isAdmin} onClick={handleDeleteSkill}>
            Delete Skill
          </MenuItem>
        </SelectedSkillMenu>
      </TableCell>
    </TableRow>
  )
}

export default memo(TableRowCells)
