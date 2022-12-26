import { ChangeEvent, useCallback, useContext } from "react"
import { Button, TextFieldProps, TextField } from "@mui/material"
import { Search } from "@mui/icons-material"
import { TableSearchContext } from "../../table.context"

const SearchInput = (props: TextFieldProps) => {
  return (
    <TextField
      placeholder="Search"
      InputProps={{ startAdornment: <Search color="action" /> }}
      inputProps={{ sx: { padding: "6.7px 14px", minWidth: 250 } }}
      {...props}
    />
  )
}

export const TableSearch = () => {
  const { search, setSearch } = useContext(TableSearchContext)

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }, [])

  return (
    <>
      <SearchInput value={search} onChange={handleSearch} />
    </>
  )
}
