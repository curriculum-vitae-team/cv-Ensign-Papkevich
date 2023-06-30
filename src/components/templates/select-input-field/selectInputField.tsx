import { TextField, MenuItem } from "@mui/material"
import { Controller } from "react-hook-form"

const SelectInputField = ({ label, data, name, control, ...props }: any) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...props}
          {...field}
          select
          label={label}
          onChange={(e) => field.onChange(e.target.value)}
          value={field.value}
        >
          <MenuItem value="">Not Selected</MenuItem>
          {data?.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  )
}

export default SelectInputField
