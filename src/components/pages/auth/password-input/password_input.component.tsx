import { ForwardedRef, forwardRef, memo, useCallback, useState } from "react"
import { IconButton, TextField, TextFieldProps } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

const PasswordInputField = (
  props: TextFieldProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const [passwordShown, setPasswordShown] = useState(false)

  const togglePasswordVisibility = useCallback(() => {
    setPasswordShown((prevState) => !prevState)
  }, [])

  return (
    <TextField
      ref={ref}
      type={passwordShown ? "password" : "text"}
      InputProps={{
        endAdornment: (
          <IconButton onClick={togglePasswordVisibility}>
            {passwordShown ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        ),
      }}
      {...props}
    />
  )
}

export default memo(forwardRef(PasswordInputField))
