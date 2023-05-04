import { TextField, MenuItem } from "@mui/material"

export const SelectInputField = ({
  label,
  register,
  registerName,
  data,
  ...props
}) => {
  return (
    <TextField
      {...props}
      select
      label={label}
      inputProps={register && registerName && register(registerName)}
    >
      {data?.map(({ id, name }) => (
        <MenuItem key={id} value={id}>
          {name}
        </MenuItem>
      ))}
    </TextField>
  )
}
