import { styled } from "@mui/material"
import { Button, TextField, Link } from "@mui/material"
import { PasswordInputField } from "../password-input"

export const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  width: 700,
  margin: "auto",
})

// export const TextFieldMod = styled(TextField)({
//   margin: 2,
//   // width: "25%",
// })

// export const PasswordField = styled(PasswordInputField)({
//   margin: 2,
//   // width: "25%",
// })

// export const ButtonMod = styled(Button)({
//   // color: "blanchedalmond",
// })

export const LinkMod = styled(Link)({
  color: "#508AA8",
  margin: "1%",

})
