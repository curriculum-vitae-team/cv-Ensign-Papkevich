import { memo } from "react"
import { useMutation } from "@apollo/client"
import { TableRow, TableCell, MenuItem } from "@mui/material"
import { ILanguage } from "../../../../interfaces/language.interface"
import { TableRowProps } from "../../../templates/table/table.types"
import { userIsAdmin } from "../../../../hooks/adminRoleHook"
import { SelectedLanguageMenu } from "./selectedLanguageMenu"
import { DELETE_LANGUAGE_MUTATION } from "../../../../graphql/mutations/deleteLanguage"

const TableRowCells = ({ item }: TableRowProps<ILanguage>) => {
  const isAdmin = userIsAdmin()
  const [deleteLanguageMutation] = useMutation<{ affected: number }>(
    DELETE_LANGUAGE_MUTATION
  )

  const handleDeleteLanguage = async () => {
    console.log("deleted")
    await deleteLanguageMutation({
      variables: { id: item.id },
      update(cache) {
        const id = cache.identify({ id: item.id, __typename: "Language" })
        cache.evict({ id })
        cache.gc()
      },
    })
  }

  return (
    <TableRow>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.native_name}</TableCell>
      <TableCell>{item.iso2}</TableCell>
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell>
        <SelectedLanguageMenu>
          <MenuItem disabled={!isAdmin} onClick={handleDeleteLanguage}>
            Delete Language
          </MenuItem>
        </SelectedLanguageMenu>
      </TableCell>
    </TableRow>
  )
}

export default memo(TableRowCells)
